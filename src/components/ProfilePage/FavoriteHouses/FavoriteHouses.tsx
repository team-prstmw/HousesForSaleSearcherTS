import { Box, Button } from '@mui/material';
import noPhoto from '../../../assets/images/nophoto.png';

const FavoriteHouses = ({ favorites }: { favorites: BasicHouseData[] }) => {

    const displayFavorites = (favorites: BasicHouseData[]) => {
        if (favorites.length > 0) {
            return (
                favorites.map((favorite: BasicHouseData, i) => {
                    console.log(favorite);
                    return (
                        <Box component="div" key={i.toString()}>
                            <h4>
                                {favorite.city}, {favorite.streetName} {favorite.streetNumber}
                            </h4>
                            <p >
                                {favorite.price}zł/m<sup>2</sup>
                            </p>
                            <img src={favorite.photo_0 ? favorite.photo_0 : noPhoto} alt="House" />
                            <p>{favorite.descriptionField}</p>
                            <Button>more info</Button>
                        </Box>
                    )
                })
            )
        } else {
            return <h3>You have no favorites yet</h3>
        }
    }
    return (
        <>
            {displayFavorites(favorites)}
        </>
    )


}

export default FavoriteHouses;