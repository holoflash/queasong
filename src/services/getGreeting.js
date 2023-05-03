import ct from 'countries-and-timezones';
import moment from 'moment-timezone';

export const getGreeting = (countryCode) => {
    const country = ct.getCountry(countryCode);
    const timezone = ct.getTimezonesForCountry(country?.id)[0].name;
    const currentTime = moment().tz(timezone);
    const currentHour = currentTime.hour();

    if (currentHour >= 6 && currentHour < 12) {
        return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}

