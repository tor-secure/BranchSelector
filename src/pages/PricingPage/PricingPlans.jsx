const plansIndia = {
  credits: [
    {title:"1 Credit" ,credits: 1, price: 199, originalPrice: 199, planID:'C1' }, 
    {title:"3 Credits" ,credits: 3, price: 499, originalPrice: 599, planID:'C3' },
    {title:"5 Credits", credits: 5, price: 799, originalPrice: 999, planID:'C5' },
    {title:"9 Credits", credits: 9, price: 1499, originalPrice: 1799, planID:'C9' },
    {title:"12 Credits", credits: 12, price: 1999, originalPrice: 2399, planID:'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment", appointment:true, price: 1999, originalPrice: 1999, planID: 'CO1' },
  ],
  bundle:[
    { title: "3 Credits + online/offline career counseling", appointment:true,credits:3 ,price: 2499, originalPrice: 2796, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling",appointment:true,credits:5 ,price: 2999, originalPrice: 3194, planID: 'CB5' },
  ]
};

const plansUS = {
  credits: [
    {title:"1 Credit", credits: 1, price: 10, originalPrice: 10, planID:'C1' },
    {title:"3 Credits" , credits: 3, price: 25, originalPrice: 30, planID:'C3' },
    {title:"5 Credits", credits: 5, price: 40, originalPrice: 50, planID:'C5' },
    {title:"9 Credits", credits: 9, price: 80, originalPrice: 90, planID:'C9' },
    {title:"12 Credits", credits: 12, price: 100, originalPrice: 120, planID:'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment",appointment:true, price: 60, originalPrice: 60, planID: 'CO1' },
  ],
  bundle:[
    { title: "3 Credits + online/offline career counseling",appointment:true,credits: 3,price: 75, originalPrice: 90, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling",appointment:true,credits: 5,price: 90, originalPrice: 110, planID: 'CB5' },
  ]
};


const getPricingPlans = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    let plan = {};

    if (data.country === 'IN') {
      plan.plan = plansIndia; // Ensure plansIndia is defined and contains the plans for India
      plan.currency = '₹';
      plan.currencyCode = 'INR'
    } else {
      plan.plan = plansUS; // Ensure plansUS is defined and contains the plans for the US
      plan.currency = '$';
      plan.currencyCode = 'USD'
    }

    return plan;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

export {plansIndia,plansUS, getPricingPlans}