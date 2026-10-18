import ShimmerMenu from "./ShimmerMenu";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <ShimmerMenu />;

  // 1. Safely find the restaurant info card across the cards array
  const restaurantInfoCard = resInfo?.cards?.find(
    (c) => c?.card?.card?.info
  )?.card?.card?.info;

  const { name = "", cuisines = [], costForTwoMessage = "" } = restaurantInfoCard || {};

  // 2. Safely find the groupedCard object across resInfo.cards
  const groupedCard = resInfo?.cards?.find(
    (c) => c?.groupedCard
  )?.groupedCard;

  // 3. Safely find the regular cards array inside cardGroupMap
  const regularCards = groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // 4. Find the card containing itemCards
  const itemCardsObj = regularCards?.find(
    (c) => c?.card?.card?.itemCards
  )?.card?.card;

  // 5. Safely destructure itemCards with an empty array fallback
  const { itemCards = [] } = itemCardsObj || {};

  // 6. Safely filter categories with fallback to empty array
  const categories = regularCards.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  const toggleAccordion = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} {costForTwoMessage && `- ${costForTwoMessage}`}
      </p>
      {/* categories accordions */}
      {categories?.map((category, index) => (
        // controlled component
        <RestaurantCategory
          key={category?.card?.card?.title || index}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;