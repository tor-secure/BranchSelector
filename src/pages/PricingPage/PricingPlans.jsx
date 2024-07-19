const plansIndia = {
  credits: [
    { credits: 1, price: 199, originalPrice: 199, planID:'C1' },
    { credits: 3, price: 499, originalPrice: 599, planID:'C3' },
    { credits: 5, price: 799, originalPrice: 999, planID:'C5' },
    { credits: 9, price: 1499, originalPrice: 1799, planID:'C9' },
    { credits: 12, price: 1999, originalPrice: 2399, planID:'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment", price: 1999, originalPrice: 1999, planID: 'CO1' },
  ],
  bundle:[
    { title: "3 Credits + online/offline career counseling", price: 2499, originalPrice: 2796, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling", price: 2999, originalPrice: 3194, planID: 'CB5' },
  ]
};

const plansUS = {
  credits: [
    { credits: 1, price: 10, originalPrice: 10, planID:'C1' },
    { credits: 3, price: 25, originalPrice: 30, planID:'C3' },
    { credits: 5, price: 40, originalPrice: 50, planID:'C5' },
    { credits: 9, price: 80, originalPrice: 90, planID:'C9' },
    { credits: 12, price: 100, originalPrice: 120, planID:'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment", price: 60, originalPrice: 60, planID: 'CO1' },
  ],
  bundle:[
    { title: "3 Credits + online/offline career counseling",credits: 3,price: 75, originalPrice: 90, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling",credits: 5,price: 90, originalPrice: 110, planID: 'CB5' },
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
    } else {
      plan.plan = plansUS; // Ensure plansUS is defined and contains the plans for the US
      plan.currency = '$';
    }

    return plan;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

export {plansIndia,plansUS, getPricingPlans}