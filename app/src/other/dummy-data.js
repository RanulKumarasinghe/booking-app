import Restaurant from './restaurant';

export const RESTAURANT = [
  new Restaurant('r1', 'The Pizzeria', 'Italian', 'Vegan', 3, 'https://media-cdn.tripadvisor.com/media/photo-s/04/34/f8/f0/gondolier-pizza-italian.jpg'),
  new Restaurant('r2', 'Mcdonalds', 'Quick & Easy', 'Non-Vegan', 4, 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_1026535662_2000133316537670495_415913.jpg'),
  new Restaurant('r3', 'Five Guys', 'Hamburgers', 'Non-Vegan', 5, 'https://pbs.twimg.com/profile_images/918493706747080705/eT3NLcPB.jpg'),
  new Restaurant('r4', 'Be Inside','German', 'Non-Vegan', 4, 'https://www.industryglobalnews24.com/images/german-restaurant-says-no-chinese-wanted.jpeg'),
  new Restaurant('r5', 'Romanticism','Light & Lovely', 'Vegan', 2, 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/02/06/11/SushiSamba.jpg'),
  new Restaurant('r6', 'Little India', 'Exotic', 'Vegan', 3, 'https://i0.wp.com/167.99.84.211/wp-content/uploads/2015/09/chai-ki-crossrail-place-canary-wharf-modern-indian-restaurant-rohit-chugh-toddy-shop-interior-bar.jpg'),
  new Restaurant('r7', 'Welcome to the day', 'Breakfast', 'Non-Vegan', 4, 'https://i.pinimg.com/originals/97/8d/2e/978d2e65fa91cba97b606aa119c41c4d.jpg'),
  new Restaurant('r8', 'Happy Samurai', 'Asian', 'Vegan', 4, 'https://media-cdn.tripadvisor.com/media/photo-s/13/55/72/d7/happy-samurai-s-new-location.jpg'),
  new Restaurant('r9', 'Snack on the side','French', 'Non-Vegan', 5, 'https://www.parisperfect.com/blog/wp-content/uploads/2015/01/French-Restaurant-Etiquette-How-to-Avoid-a-Faux-Pas-in-Paris-by-Paris-Perfect.jpg'),
  new Restaurant('r10', 'Handle the heat', 'Summer', 'Vegan', 3, 'https://www.spicytadka.co.uk/wp-content/uploads/2020/08/Banner-04.jpg')
];

export const MenuData = [{
  id: 20,
  category:'Kebab',
  items:[{
    id: 1,
    name:'Doner kebab wrap',
    desc:'Wrap with lamb doner meat, sliced and seasoned',
    price:'£6.99'
  },
  {
    id: 2,
    name:'Kebab meat',
    desc:'Strips of kebab meat served with sauce',
    price:'£5.99'
  },
  {
    id: 3,
    name:'Kebab meat with chips',
    desc:'Strips of kebab meat served with sauce and chips',
    price:'£6.99'
  }
]},
{
  id: 4,
  category:'Hamburger',
  items:[
  {
    id: 5,
    name:'Burger',
    desc:'Wrap with lamb doner meat, sliced and seasoned',
    price:'£4.99'
  },
  {
    id: 6,
    name:'Double burger',
    desc:'Strips of kebab meat served with sauce',
    price:'£6.99'
  },
  {
    id: 7,
    name:'Cheese burger',
    desc:'Strips of kebab meat served with sauce',
    price:'£5.99'
  },
  {
    id: 8,
    name:'Double cheese burger',
    desc:'Strips of kebab meat served with sauce',
    price:'£7.99'
  }
]
},
{
  id: 9,
  category:'Pizza',
  items:[{
    id: 10,
    name:'Margherita ',
    desc:'Classic pizza with tomato sauce and mozzarella',
    price:'£4.99'
  },
  {
    id: 11,
    name:'American hot',
    desc:'Hot american style pizza',
    price:'£6.99'
  },
  {
    id: 12,
    name:'Ham and Pineapple',
    desc:'Controversial pizza, tasty or not?',
    price:'£5.99'
  },
  {
    id: 13,
    name:'Meat feast',
    desc:'Pizza with beef, pork and chicken',
    price:'£7.99'
  }
]
}];