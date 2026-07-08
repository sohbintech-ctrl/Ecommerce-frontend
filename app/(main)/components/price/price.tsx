interface PriceProps{
    price:number,
    discount:number,
}
const Price=({price,discount}:PriceProps)=>{
return (
  <div className="md:flex gap-1 items-center">
    <p className="font-bold text-[#DB4444]">
      Rs. {Math.round(price - (price * discount) / 100)}
    </p>
    <div className="flex gap-1">
      <p className="text-gray-500" style={{ textDecoration: "line-through" }}>
        Rs.{price}
      </p>

      <p className="text-[#DB4444] font-semibold">{discount}% OFF</p>
    </div>
  </div>
);
}
export default Price;