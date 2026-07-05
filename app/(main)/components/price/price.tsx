interface PriceProps{
    price:number,
    discount:number,
}
const Price=({price,discount}:PriceProps)=>{
return(
     <div className="md:flex gap-1 items-center">
  
             <p className="font-bold text-[#DB4444]">
              Rs. {Math.round(price - (price * discount) / 100)}
              </p>

            <p className="text-gray-500" style={{ textDecoration: "line-through" }}>
              Rs.{price}
            </p>

         <p className="text-sm text-[#DB4444] font-semibold">
          {discount}% OFF
        </p>
       </div>
)
}
export default Price;