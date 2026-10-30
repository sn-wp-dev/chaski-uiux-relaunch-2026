(function () {
    'use strict';

    function initStatus(statusElement) {
        if (!statusElement || !window.Intl || !Intl.DateTimeFormat) {
            return;
        }

    var isHeroStatus = statusElement.hasAttribute('data-chaski-hero-shop-status');
    var timezone = statusElement.getAttribute('data-timezone') || 'Europe/Berlin';
    var configuredHours = {};

    try {
        configuredHours = JSON.parse(statusElement.getAttribute('data-hours') || '{}') || {};
    } catch (error) {
        configuredHours = {};
    }

    var hasConfiguredSchedule = configuredHours.weekly && Object.keys(configuredHours.weekly).length > 0;
    var dateFormatter;

    try {
        dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23'
        });
    } catch (error) {
        return;
    }

    function getCurrentShopTime() {
        var parts = dateFormatter.formatToParts(new Date());
        var values = {};

        parts.forEach(function (part) {
            if (part.type !== 'literal') {
                values[part.type] = parseInt(part.value, 10);
            }
        });

        return values;
    }

    function getEasterSunday(year) {
        var a = year % 19;
        var b = Math.floor(year / 100);
        var c = year % 100;
        var d = Math.floor(b / 4);
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3);
        var h = (19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = (32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var month = Math.floor((h + l - 7 * m + 114) / 31);
        var day = ((h + l - 7 * m + 114) % 31) + 1;

        return new Date(Date.UTC(year, month - 1, day));
    }

    function isoDate(date) {
        return date.getUTCFullYear() + '-' +
            String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
            String(date.getUTCDate()).padStart(2, '0');
    }

    function getHolidayDates(year) {
        var holidays = [
            year + '-01-01',
            year + '-01-06',
            year + '-05-01',
            year + '-10-03',
            year + '-11-01',
            year + '-12-25',
            year + '-12-26'
        ];
        var easterSunday = getEasterSunday(year);

        [-2, 1, 39, 50, 60].forEach(function (offset) {
            var holiday = new Date(easterSunday.getTime());
            holiday.setUTCDate(holiday.getUTCDate() + offset);
            holidays.push(isoDate(holiday));
        });

        return holidays;
    }

    function timeToMinutes(value) {
        var parts = String(value || '').split(':');

        if (parts.length !== 2) {
            return null;
        }

        return Number(parts[0]) * 60 + Number(parts[1]);
    }

    function getConfiguredWindows(currentDate, weekday) {
        var exceptions = Array.isArray(configuredHours.exceptions) ? configuredHours.exceptions : [];

        for (var index = 0; index < exceptions.length; index += 1) {
            var exception = exceptions[index] || {};

            if (exception.date !== currentDate) {
                continue;
            }

            if (exception.closed) {
                return [];
            }

            if (Array.isArray(exception.windows) && exception.windows.length) {
                return exception.windows;
            }
        }

        return Array.isArray(configuredHours.weekly[String(weekday)]) ? configuredHours.weekly[String(weekday)] : [];
    }

    function isConfiguredHoliday(currentDate, year) {
        if (!configuredHours.autoHolidays) {
            return false;
        }

        if (Array.isArray(configuredHours.exceptions)) {
            for (var index = 0; index < configuredHours.exceptions.length; index += 1) {
                var exception = configuredHours.exceptions[index] || {};

                if (exception.date === currentDate && Array.isArray(exception.windows) && exception.windows.length) {
                    return false;
                }
            }
        }

        if (Array.isArray(configuredHours.holidayDates) && configuredHours.holidayDates.length) {
            return configuredHours.holidayDates.indexOf(currentDate) !== -1;
        }

        return getHolidayDates(year).indexOf(currentDate) !== -1;
    }

    function isOpen() {
        var now = getCurrentShopTime();
        var currentDate = now.year + '-' + String(now.month).padStart(2, '0') + '-' + String(now.day).padStart(2, '0');
        var weekday = new Date(Date.UTC(now.year, now.month - 1, now.day)).getUTCDay() || 7;
        var minutes = now.hour * 60 + now.minute;
        var isHoliday = hasConfiguredSchedule ? isConfiguredHoliday(currentDate, now.year) : getHolidayDates(now.year).indexOf(currentDate) !== -1;

        if (isHoliday) {
            return false;
        }

        if (hasConfiguredSchedule) {
            return getConfiguredWindows(currentDate, weekday).some(function (window) {
                var open = timeToMinutes(window.open);
                var close = timeToMinutes(window.close);
                return open !== null && close !== null && minutes >= open && minutes < close;
            });
        }

        if (weekday >= 1 && weekday <= 5) {
            return minutes >= 16 * 60 && minutes < 19 * 60;
        }

        return weekday === 6 && minutes >= 10 * 60 && minutes < 13 * 60;
    }

    function updateStatus() {
        var open = isOpen();
        var stateLabel = open ? 'geöffnet' : 'geschlossen';
        var label = 'Laden ' + stateLabel + (isHeroStatus ? ' / 24/7 Click & Collect verfügbar' : '');
        var stateClass = open ? 'chaski-shop-status--open' : 'chaski-shop-status--closed';

        statusElement.classList.remove('chaski-shop-status--open', 'chaski-shop-status--closed');
        statusElement.classList.add(stateClass);
        if (isHeroStatus) {
            statusElement.classList.remove('chaski-hero-review__status--open', 'chaski-hero-review__status--closed');
            statusElement.classList.add(open ? 'chaski-hero-review__status--open' : 'chaski-hero-review__status--closed');
        }
        statusElement.setAttribute('data-open', open ? '1' : '0');
        statusElement.setAttribute('aria-label', isHeroStatus ? label : 'Paketshop ' + stateLabel);
        statusElement.setAttribute('title', isHeroStatus ? label : 'Paketshop ' + stateLabel);

        var labelElement = statusElement.querySelector(isHeroStatus ? '.chaski-hero-review__status-label' : '.chaski-shop-status__label');
        if (labelElement) {
            labelElement.textContent = label;
        }
    }

    updateStatus();
        window.setInterval(updateStatus, 60 * 1000);
    }

    document.querySelectorAll('[data-chaski-shop-status], [data-chaski-hero-shop-status]').forEach(initStatus);
}());
