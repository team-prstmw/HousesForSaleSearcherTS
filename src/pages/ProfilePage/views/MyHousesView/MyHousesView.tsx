import MyHousesListItem from 'src/components/ProfilePage/MyHousesList/ListItem/MyHousesListItem';
import MyHousesList from 'src/components/ProfilePage/MyHousesList/MyHousesList';
import styles from './MyHousesView.module.css';

export default function MyHousesView() {
  return (
    <div className={styles.container}>
      <MyHousesList title="HOUSES FOR SALE">
        <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" archived={false} />
      </MyHousesList>

      <MyHousesList title="ARCHIVED">
        <>
          <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" chip="a" archived />
          <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" chip="a" archived />
          <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" chip="bought" archived />
        </>
      </MyHousesList>

      <MyHousesList title="BOUGHT HOUSES">
        <>
          <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" archived={false} />
          <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" archived={false} />
        </>
      </MyHousesList>
    </div>
  );
}
