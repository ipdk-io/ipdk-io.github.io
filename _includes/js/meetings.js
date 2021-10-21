var euroDate = new Date(Date.UTC(2018, 3, 3, 15, 0, 0, 0));
var asiaDate = new Date(Date.UTC(2018, 3, 12, 4, 0, 0, 0));
var euroBugDate = new Date(Date.UTC(2018, 3, 10, 15, 0, 0, 0));
var asiaBugDate = new Date(Date.UTC(2018, 3, 19, 4, 0, 0, 0));

// Holiday list. Should be of form [date, recurring=true/false]
var USHolidays = [[ new Date(2018, 11, 24), true ], //Christmas Eve
        [ new Date(2018, 11, 25), true ], //Christmas
        [ new Date(2018, 11, 26), true ], //Day after Christmas
        [ new Date(2018, 11, 31), true], //New Years Eve
        [ new Date(2018, 0, 1), true ], //New Years
        [ new Date(2019, 3, 16), true ], //SPDK Summit
        [ new Date(2019, 3, 17), true ], //SPDK Summit
        [ new Date(2019, 6, 4), true ], //4th of July
        [ new Date(2019, 4, 27), false ], //Memorial Day
        [ new Date(2019, 8, 2), false ], //Labor Day
        [ new Date(2019, 10, 28), false ], //Thanksgiving
        [ new Date(2019, 10, 29), false ]] //Thanksgiving Recovery Day :)

var EuroHolidays = []

var AsiaHolidays = []

// Time zones for holiday checking.
var USTimeZone = 'America/Phoenix'
var EuroTimeZone = 'Europe/Warsaw'
var AsiaTimeZone = 'Asia/Shanghai'

function compareHoliday(date, holidayList, zone) {
        var overnightStart = 16;
        var localeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: zone, hour: 'numeric', minute: 'numeric' };
        var localDate = new Date(date.toLocaleDateString(undefined, localeOptions))

        for (var i = 0; i < holidayList.length; i++) {
                let holiday = holidayList[i][0];
                let recurring = holidayList[i][1];

                if (recurring == false) {
                        if (localDate.getFullYear() != holiday.getFullYear()) {
                                continue;
                        }
                }

                if (localDate.getMonth() != holiday.getMonth()) {
                        continue;
                }

                if (localDate.getDate() == holiday.getDate()) {
                        return true;
                }

                // Any meeting after business hours on the day before a holiday is typically cancelled.
                if (localDate.getDate() == holiday.getDate() - 1 && localDate.getHours() > overnightStart) {
                        return true;
                }

                continue;
        }

        return false;
}

function formatDate(date) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZoneName: 'short', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString(undefined, options);
}

var currentDate = new Date();
currentDate.setHours(currentDate.getHours() - 1);

while (euroDate < currentDate || compareHoliday(euroDate, USHolidays, USTimeZone) || compareHoliday(euroDate, EuroHolidays, EuroTimeZone)) {
        euroDate.setDate(euroDate.getDate() + 14);
}

while (asiaDate < currentDate || compareHoliday(asiaDate, USHolidays, USTimeZone) || compareHoliday(asiaDate, AsiaHolidays, AsiaTimeZone)) {
        asiaDate.setDate(asiaDate.getDate() + 14);
}

while (asiaBugDate < currentDate || compareHoliday(asiaBugDate, USHolidays, USTimeZone) || compareHoliday(asiaBugDate, AsiaHolidays, AsiaTimeZone)) {
        asiaBugDate.setDate(asiaBugDate.getDate() + 14);
}

while (euroBugDate < currentDate || compareHoliday(euroBugDate, USHolidays, USTimeZone) || compareHoliday(euroBugDate, EuroHolidays, EuroTimeZone)) {
        euroBugDate.setDate(euroBugDate.getDate() + 14);
}

// Regenerate the dates here - this makes sure we account for daylight savings adjustments between the starting
// date at the beginning of this file and the calculated address based on the current date/time.
euroDate = new Date(Date.UTC(euroDate.getUTCFullYear(), euroDate.getUTCMonth(), euroDate.getUTCDate(), 15, 0, 0, 0));
asiaDate = new Date(Date.UTC(asiaDate.getUTCFullYear(), asiaDate.getUTCMonth(), asiaDate.getUTCDate(), 4, 0, 0, 0));
asiaBugDate = new Date(Date.UTC(asiaBugDate.getUTCFullYear(), asiaBugDate.getUTCMonth(), asiaBugDate.getUTCDate(), 4, 0, 0, 0));
euroBugDate = new Date(Date.UTC(euroBugDate.getUTCFullYear(), euroBugDate.getUTCMonth(), euroBugDate.getUTCDate(), 15, 0, 0, 0));

document.getElementById("euro-mtg").textContent = formatDate(euroDate);
document.getElementById("asia-mtg").textContent = formatDate(asiaDate);
document.getElementById("asia-bug-mtg").textContent = formatDate(asiaBugDate);
document.getElementById("euro-bug-mtg").textContent = formatDate(euroBugDate);
