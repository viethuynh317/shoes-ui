const imageData = (image, caption) => ({
  image,
  caption,
});

const introduceSale = (image, title, subTitle, sale, id) => ({
  image,
  title,
  subTitle,
  sale,
  id,
});

export const sliderData = [
  imageData(
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/bg-shoes-sport-2.jpg",
    `<div style="font-size: 70px; color: #fff}">RUN<br/>TRAIN LIVE<br/><div style="font-size: 15px; padding-top: 8px">PURSUE THESE ASPIRATIONS MOBILIZE 
    </div><button class="btn-banner" style="padding: 16px 32px; color: #fff; background-color: #ffb900; border: none; cursor: pointer">SHOP NOW</button></div>`
  ),
  imageData(
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/bg-shoes-sport-3.jpg",
    `<div style="font-size: 70px; color: #fff}">SPORT &<br/>OUTDOOR<br/>SHOES<br/><div style="font-size: 15px; padding-top: 8px">PURSUE THESE ASPIRATIONS MOBILIZE 
    </div><button class="btn-banner" style="padding: 16px 32px; color: #fff; background-color: #ffb900; border: none; cursor: pointer">SHOP NOW</button></div>`
  ),
  imageData(
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/bg-shoes-sport-1.jpg",
    `<div style="position: absolute; left: 1350px; bottom: -80px; font-size: 70px; color: #fff;}">SPORTS<br/>WOMEN<br/>SHOES<br/><div style="font-size: 15px; padding-top: 8px">PURSUE THESE ASPIRATIONS MOBILIZE 
    </div><button class="btn-banner" style="padding: 16px 32px; color: #fff; background-color: #ffb900; border: none; cursor: pointer">SHOP NOW</button></div>`
  ),
];

export const introduceSaleBanner = [
  introduceSale(
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/shoes-banner-1.jpg",
    "sport shoes",
    "Prevention social",
    "-30%",
    "1"
  ),
  introduceSale(
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/shoes-banner-2.jpg",
    "sport color",
    "Prevention social",
    "-50%",
    "2"
  ),
  introduceSale(
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/shoes-banner-3.jpg",
    "new shoes",
    "Prevention social",
    "-20%",
    "3"
  ),
];
