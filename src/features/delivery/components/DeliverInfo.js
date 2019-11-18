import React from 'react'

const DeliveryInfo = props =>{
    return(
        <div >
            <div className="py-5 px-1 text-center bg-warning">Our  Delivery Service</div>

<div className="d-flex flex-row juistify-content-between flex-wrap pt-2">

<div className=" col-lg-4 col-xs-12 p-1">
     <DInfoCard
     title="title"
     icon={<i class="fas fa-truck"></i>}
     para="Our services are designed to fulfill the needs of both e-commerce sellers and buyers in Myanmar. Our delivery professionals will collect the products from merchants, deliver to any city in our network, collect cash on delivery and transfer it back to sellers by bank. Merchants will be well informed about the delivery and payment status by our app or dashboard. "
     />
</div>

<div className=" col-lg-4 col-xs-12 p-1">
     <DInfoCard
     title="title"
     icon="icon"
     para="Our services are designed to fulfill the needs of both e-commerce sellers and buyers in Myanmar. Our delivery professionals will collect the products from merchants, deliver to any city in our network, collect cash on delivery and transfer it back to sellers by bank. Merchants will be well informed about the delivery and payment status by our app or dashboard. "
     />
</div>

<div className=" col-lg-4 col-xs-12 p-1">
     <DInfoCard
     title="title"
     icon="icon"
     para="Our services are designed to fulfill the needs of both e-commerce sellers and buyers in Myanmar. Our delivery professionals will collect the products from merchants, deliver to any city in our network, collect cash on delivery and transfer it back to sellers by bank. Merchants will be well informed about the delivery and payment status by our app or dashboard. "
     />
</div>

</div>  

<div className="p-5 border">
connect delivery
</div>
        </div>
    )
}

const DInfoCard = ({icon,title,para}) => {
    return(
      
    <div className="d-flex flex-column align-items-center  px-3 "  style={{lineHeight:4,border:"1px solid red"}} >
        <div> {icon}  </div>
        <span className="font-weight-bold">{title}</span>
      
        <p>{para}</p>  
      
   </div>

    )
}
export default DeliveryInfo;