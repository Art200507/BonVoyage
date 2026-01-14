export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people: '5 to 10 People'
    },
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    },
]


export const AI_PROMPT = `Generate a travel plan for {location} for {totalDays} days, for {traveler} with a {budget} budget. Return the response in the following JSON format:

{
  "location": "{location}",
  "duration": "{totalDays} Days",
  "num_people": "{traveler}",
  "budget": "{budget}",
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string (price range)",
      "rating": "string (e.g., 4.5)",
      "description": "string"
    }
  ],
  "itinerary": {
    "day1": {
      "bestTime": "string",
      "plan": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "placeAddress": "string",
          "ticketPricing": "string",
          "timeTravel": "string (duration)",
          "rating": "string (optional)"
        }
      ]
    }
  }
}`;