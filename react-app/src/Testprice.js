function prices(luxury, suv, sedan, hatchback, distance){
    const date = new Date();
    const hours = date.getHours();

    const luxury_price_per_km = 20;
    const suv_price_per_km = 17;
    const sedan_price_per_km = 15;
    const hatchback_price_per_km = 10;

    let luxury_price=0
    let suv_price=0
    let sedan_price=0
    let hatchback_price=0

    if(luxury === 0)  luxury_price = "No Rides Available"
    else if(distance<(2 * luxury)){
        luxury_price = luxury_price_per_km * distance
    }
    else{ 
        luxury_price = luxury_price_per_km* (distance-2*luxury)
    }


    if(suv === 0)  suv_price = "No Rides Available"
    else if(distance<(2 * suv)) {suv_price = suv_price_per_km * distance}
    else {suv_price = suv_price_per_km * (distance-2*suv)}


    if(sedan === 0)  sedan_price = "No Rides Available"
    else if(distance<(2 * sedan)) {sedan_price = sedan_price_per_km * distance}
    else {sedan_price = sedan_price_per_km * (distance-2*sedan)}

    if(hatchback === 0)  hatchback_price = "No Rides Available"
    else if(distance<(2 * hatchback)) {hatchback_price = hatchback_price_per_km * distance}
    else hatchback_price = hatchback_price_per_km * distance * 0.75


    if(hours >= 6 && hours <= 20){
        // day time
        return [luxury_price, sedan_price,suv_price, hatchback_price]
    }
    else{
        // night time
        return [luxury_price*1.25, sedan_price*1.25,suv_price*1.25, hatchback_price*1.25]
    }
}

console.log(prices(0, 0, 0, 10, 20))