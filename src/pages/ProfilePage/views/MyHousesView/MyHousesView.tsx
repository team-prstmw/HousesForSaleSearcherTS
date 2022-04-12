import MyHousesListItem from '../../../../components/MyHousesList/ListItem/MyHousesListItem';
import MyHousesList from '../../../../components/MyHousesList/MyHousesList';
import styles from './MyHousesView.module.css';

export default function MyHousesView() {
  return (
    <div className={styles.container}>
      <MyHousesList
        title="HOUSES FOR SALE"
        listItem={
          <>
            <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" archived={false} />
          </>
        }
      />
      <MyHousesList
        title="ARCHIVED"
        listItem={
          <>
            <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" chip="a" archived />
            <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" chip="a" archived />
            <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" chip="bought" archived />
          </>
        }
      />
      <MyHousesList
        title="BOUGHT HOUSES"
        listItem={
          <>
            <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" archived={false} />
            <MyHousesListItem primaryText="420 Baker St. London" secondaryText="299,999£" archived={false} />
          </>
        }
      />
    </div>
  );
}
