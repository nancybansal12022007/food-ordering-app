import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId, sla } =
    resData?.info;

  return (
    <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:shadow-md hover:bg-gray-200 transition-all">
      <div>
        <img
          className="w-[250px] h-[150px] rounded-lg object-cover"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
          onError={(e) => {
            e.target.src = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId;
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="py-4 text-lg font-bold">{name}</h3>
        <hr />
        <em>{cuisines?.join(", ")}</em>
        <h4 className="flex items-center gap-2">
          <span>{avgRating} ⭐</span>
        </h4>
        <h4 className="flex items-center gap-2">
          <span>{costForTwo}</span>
        </h4>
        <h4 className="flex items-center gap-2">
          <span>{sla?.deliveryTime} minutes</span>
        </h4>
      </div>
    </div>
  );
};

// Higher Order Component
export const withDiscountLabel = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg z-10 text-xs font-bold">
          Discount
        </label>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default RestaurantCard;