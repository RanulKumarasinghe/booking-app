import firebase from '@/utils/firebase'
import ReservationListEntry from '../components/ReservationListEntry'

export default ReservationList = () => {

    const data = Array(3).fill({
        a:'2',
        b:'d'
    });

    const getBookings = async () => {
        await firebase.firestore().collection("bookings").get().then((snapshot) => {
            const snapshotData = [];
            snapshot.docs.forEach(doc => {
                snapshotData.push(doc.data())
            });
            data = [...snapshotData];
        });
    }

    (function () {
        getBookings();
    })();

    return (
        <List
            style={styles.container}
            data={data}
            renderItem={ReservationListEntry}
        />
    );
}