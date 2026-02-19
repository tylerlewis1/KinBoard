import * as Calendar from 'expo-calendar';
export default function useEvents(){
    const addToDeviceCalleneder = async(event) => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        try{
            if (status === 'granted') {
                Calendar.createEventInCalendarAsync({
                    title: event.name,
                    notes: (event.description),
                    startDate: event.date.toDate(),
                    endDate: event.endDate.toDate(),
                    location: event.location
                })
            }
        } catch(error) {
            console.log(error);
        }
    }
    return{
        addToDeviceCalleneder
    }
}