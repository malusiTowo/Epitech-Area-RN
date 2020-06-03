import React from 'react';
import { Feather, Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const widgets = [
  {
    "title": "A reminder to drink water at certain time",
    "color": "#262626",
    "iconOne": <MaterialCommunityIcons name='weather-cloudy' color='white' size={30} />,
    "iconTwo": <Ionicons name="ios-notifications" size={30} color="white" />,
    "data": {
      "action": {
        "name": "all_hours",
        "hour": 15
      },
      "reaction": {
        "name": "send_notification",
        "message": "Hey there 😀! Time to get a glass of water"
      }
    }
  },
  {
    "title": "Remind yourself to meditate every day",
    "color": "#29bf12",
    "iconOne": <MaterialCommunityIcons name='nature-people' color='white' size={30} />,
    "iconTwo": <Ionicons name="ios-notifications" size={30} color="white" />,
    "data": {
      "action": {
        "name": "all_hours",
        "hour": 15
      },
      "reaction": {
        "name": "send_notification",
        "message": "Hey there 😀! Time to meditate"
      }
    }
  },
  {
    "title": "Send me a notification when the temperature is over a certain degree",
    "color": "#e43",
    "iconOne": <MaterialCommunityIcons name='temperature-celsius' color='white' size={30} />,
    "iconTwo": <Ionicons name="ios-notifications" size={30} color="white" />,
    "data": {
      "action": {
        "name": "temperature_upper",
        "checked": false,
        "city": "Toulouse",
        "temperature": "20",
      },
      "reaction": {
        "name": "send_notification",
        "message": "Hey there 😀! its over degrees"
      }
    }
  },
  {
    "title": "Send me a notification when the temperature is below a certain degree",
    "color": "#2c6efc",
    "iconOne": <MaterialCommunityIcons name='temperature-celsius' color='white' size={30} />,
    "iconTwo": <Ionicons name="ios-notifications" size={30} color="white" />,
    "data": {
      "action": {
        "name": "temperature_under",
        "checked": false,
        "city": "Toulouse",
        "temperature": "20",
      },
      "reaction": {
        "name": "send_notification",
        "message": "Hey there 😀! its over degrees"
      }
    }
  },
  {
    "title": "Send me a notification when the wind is over a certain speed",
    "color": "#2e294e",
    "iconOne": <Feather name='wind' color='white' size={30} />,
    "iconTwo": <Ionicons name="ios-notifications" size={30} color="white" />,
    "data": {
      "action": {
        "name": "wind_upper",
        "checked": false,
        "city": "Toulouse",
        "temperature": "20",
      },
      "reaction": {
        "name": "send_notification",
        "message": "Hey there 😀! its over speed"
      }
    }
  },
  {
    "title": "Send me a notification when the wind is below a certain speed",
    "color": "#09f",
    "iconOne": <Feather name='wind' color='white' size={30} />,
    "iconTwo": <Ionicons name="ios-notifications" size={30} color="white" />,
    "data": {
      "action": {
        "name": "wind_under",
        "checked": false,
        "city": "Toulouse",
        "temperature": "20",
      },
      "reaction": {
        "name": "send_notification",
        "message": "Hey there 😀! its over speed"
      }
    }

  },
  {
    "title": "Send me an email when the wind is below a certain speed",
    "color": "#09fddd",
    "iconOne": <Feather name='wind' color='white' size={30} />,
    "iconTwo": <MaterialCommunityIcons name="email-plus-outline" size={30} color="white" />,
    "data": {
      "action": {
        "name": "wind_under",
        "checked": false,
        "city": "Toulouse",
        "temperature": "20",
      },
      "reaction": {
        "mail": "mail",
        "subject": "area mail notification",
        "message": "Hey there 😀! its over speed",
        "name": "send_me_mail"
      }
    }
  }
];

export const actions = [
  {
    "title": "Temperature below",
    "description": "This trigger fires once the temperature has decreased beyond the specified degree specified by you.",
    "icon": <MaterialCommunityIcons name='temperature-celsius' color='white' size={60} />,
    "color": "#e43",
    "name": "temperature_under",
    "params": [
      {
        "type": "number",
        "name": "temperature"
      },
      {
        "type": "text",
        "name": "city"
      },
      {
        "type": "default",
        "name": "checked",
        "value": false
      }
    ],
  },
  {
    "title": "Temperature over",
    "description": "This trigger fires once the temperature has increased beyond the specified degree specified by you.",
    "icon": <MaterialCommunityIcons name='temperature-celsius' color='white' size={60} />,
    "color": "#0062fe",
    "name": "temperature_upper",
    "params": [
      {
        "type": "number",
        "name": "temperature"
      },
      {
        "type": "text",
        "name": "city"
      },
      {
        "type": "default",
        "name": "checked",
        "value": false
      }
    ],
  },
  {
    "title": "Wind over",
    "description": "This trigger fires once the wind has increased beyond the specified speed specified by you.",
    "icon": <Feather name='wind' color='white' size={60} />,
    "color": "#cc73e1",
    "name": "wind_upper",
    "params": [
      {
        "type": "number",
        "name": "wind"
      },
      {
        "type": "text",
        "name": "city"
      },
      {
        "type": "default",
        "name": "checked",
        "value": false
      }
    ],
  },
  {
    "title": "Wind below",
    "description": "This trigger fires once the wind has decreased beyond the specified speed specified by you.",
    "icon": <Feather name='wind' color='white' size={60} />,
    "color": "#29bf12",
    "name": "wind_under",
    "params": [
      {
        "type": "number",
        "name": "wind"
      },
      {
        "type": "text",
        "name": "city"
      },
      {
        "type": "default",
        "name": "checked",
        "value": false
      }
    ],
  },
  {
    "title": "Once an hour",
    "description": "This trigger fires once an hour.",
    "icon": <Feather name="clock" size={60} color="white" />,
    "color": "#23448b",
    "name": "all_hours",
    "params": [
      {
        "type": "number",
        "name": "minute"
      }
    ],
  },
  {
    "title": "Once a day",
    "description": "This trigger fires once a day.",
    "icon": <Feather name="clock" size={60} color="white" />,
    "color": "#ee4627",
    "name": "all_days",
    "params": [
      {
        "type": "number",
        "name": "hour"
      }
    ],
  },
  {
    "title": "Stock Over",
    "description": "This trigger checks at 8am if the specified stock is over the specified value",
    "icon": <FontAwesome name="money" size={60} color="white" />,
    "color": "#e4405f",
    "name": "stock_upper",
    "params": [
      {
        "type": "list",
        "options": [
          'CAC',
          'DOW',
          'DAX',
          'LSE',
          'AAPL',
          'GOOG',
          'MSFT',
          'AMZN',
          'EURUSD',
          'BTCUSD'],
        "name": "stock"
      },
      {
        "type": "number",
        "name": "open_value"
      }
    ],
  },
  {
    "title": "Stock Under",
    "description": "This trigger checks at 8am if the specified stock is under the specified value",
    "icon": <FontAwesome name="money" size={60} color="white" />,
    "color": "#2c6efc",
    "name": "stock_under",
    "params": [
      {
        "type": "list",
        "options": [
          'CAC',
          'DOW',
          'DAX',
          'LSE',
          'AAPL',
          'GOOG',
          'MSFT',
          'AMZN',
          'EURUSD',
          'BTCUSD'],
        "name": "stock"
      },
      {
        "type": "number",
        "name": "open_value"
      }
    ],
  },
  {
    "title": "Crypto Currency Over",
    "description": "This trigger checks at 8am if the specified crypto currency is over the specified value",
    "icon": <MaterialIcons name="attach-money" size={60} color="white" />,
    "color": "#e4405f",
    "name": "crypto_upper",
    "params": [
      {
        "type": "list",
        "options": [
          "BTC/USD",
          "BTC/EUR",
          "ETH/USD",
          "ETH/EUR",
          "LBTC/USD",
          "LBTC/EUR",
        ],
        "name": "money"
      },
      {
        "type": "number",
        "name": "value"
      }
    ],
  },
  {
    "title": "Crypto Currency Under",
    "description": "This trigger checks at 8am if the specified crypto currency is below the specified value",
    "icon": <MaterialIcons name="attach-money" size={60} color="white" />,
    "color": "#2c6efc",
    "name": "crypto_under",
    "params": [
      {
        "type": "list",
        "options": [
          "BTC/USD",
          "BTC/EUR",
          "ETH/USD",
          "ETH/EUR",
          "LBTC/USD",
          "LBTC/EUR",
        ],
        "name": "money"
      },
      {
        "type": "number",
        "name": "value"
      }
    ],
  },
];

export const reactions = [
  {
    "title": "Send me a notification",
    "description": "This will send you a notification with the message you specified.",
    "icon": <Ionicons name="ios-notifications" size={60} color="white" />,
    "color": "#8cc251",
    "name": "send_notification",
    "params": [
      {
        "type": "text",
        "name": "message"
      },
    ],
  },
  {
    "title": "Send me an email",
    "description": "This will send you an email with the message you specified.",
    "icon": <MaterialCommunityIcons name="email-plus-outline" size={30} color="white" />,
    "color": "red",
    "name": "send_me_mail",
    "params": [
      {
        "type": "text",
        "name": "mail"
      },
      {
        "type": "text",
        "name": "subject"
      },
      {
        "type": "text",
        "name": "message"
      },
    ],
  },
]

export default widgets;