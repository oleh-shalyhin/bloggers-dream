export const postsResponseMock = {
  posts: [
    {
      id: 1,
      title: 'His mother had always taught him',
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      userId: 1,
      tags: ['history', 'american', 'crime'],
      reactions: 2,
    },
    {
      id: 2,
      title: 'He was an expert but not in a discipline',
      body: 'He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.',
      userId: 2,
      tags: ['french', 'fiction', 'english'],
      reactions: 2,
    },
    {
      id: 3,
      title: 'Dave watched as the forest burned up on the hill.',
      body: "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
      userId: 3,
      tags: ['magical', 'history', 'french'],
      reactions: 5,
    },
  ],
  total: 150,
  skip: 0,
  limit: 3,
};

export const commentsResponseMock = {
  comments: [
    {
      id: 1,
      body: 'This is some awesome thinking!',
      postId: 100,
      user: {
        id: 1,
        username: 'atuny0',
      },
    },
    {
      id: 2,
      body: 'What terrific math skills you’re showing!',
      postId: 27,
      user: {
        id: 2,
        username: 'hbingley1',
      },
    },
    {
      id: 3,
      body: 'You are an amazing writer!',
      postId: 61,
      user: {
        id: 3,
        username: 'rshawe2',
      },
    },
  ],
  total: 340,
  skip: 0,
  limit: 3,
};

export const usersResponseMock = {
  users: [
    {
      id: 1,
      firstName: 'Terry',
      lastName: 'Medhurst',
      maidenName: 'Smitham',
      age: 50,
      gender: 'male',
      email: 'atuny0@sohu.com',
      phone: '+63 791 675 8914',
      username: 'atuny0',
      password: '9uQFF1Lh',
      birthDate: '2000-12-25',
      image: 'https://robohash.org/hicveldicta.png',
      bloodGroup: 'A−',
      height: 189,
      weight: 75.4,
      eyeColor: 'Green',
      hair: {
        color: 'Black',
        type: 'Strands',
      },
      domain: 'slashdot.org',
      ip: '117.29.86.254',
      address: {
        address: '1745 T Street Southeast',
        city: 'Washington',
        coordinates: {
          lat: 38.867033,
          lng: -76.979235,
        },
        postalCode: '20020',
        state: 'DC',
      },
      macAddress: '13:69:BA:56:A3:74',
      university: 'Capitol University',
      bank: {
        cardExpire: '06/22',
        cardNumber: '50380955204220685',
        cardType: 'maestro',
        currency: 'Peso',
        iban: 'NO17 0695 2754 967',
      },
      company: {
        address: {
          address: '629 Debbie Drive',
          city: 'Nashville',
          coordinates: {
            lat: 36.208114,
            lng: -86.58621199999999,
          },
          postalCode: '37076',
          state: 'TN',
        },
        department: 'Marketing',
        name: "Blanda-O'Keefe",
        title: 'Help Desk Operator',
      },
      ein: '20-9487066',
      ssn: '661-64-2976',
      userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24',
    },
    {
      id: 2,
      firstName: 'Sheldon',
      lastName: 'Quigley',
      maidenName: 'Cole',
      age: 28,
      gender: 'male',
      email: 'hbingley1@plala.or.jp',
      phone: '+7 813 117 7139',
      username: 'hbingley1',
      password: 'CQutx25i8r',
      birthDate: '2003-08-02',
      image: 'https://robohash.org/doloremquesintcorrupti.png',
      bloodGroup: 'O+',
      height: 187,
      weight: 74,
      eyeColor: 'Brown',
      hair: {
        color: 'Blond',
        type: 'Curly',
      },
      domain: '51.la',
      ip: '253.240.20.181',
      address: {
        address: '6007 Applegate Lane',
        city: 'Louisville',
        coordinates: {
          lat: 38.1343013,
          lng: -85.6498512,
        },
        postalCode: '40219',
        state: 'KY',
      },
      macAddress: '13:F1:00:DA:A4:12',
      university: 'Stavropol State Technical University',
      bank: {
        cardExpire: '10/23',
        cardNumber: '5355920631952404',
        cardType: 'mastercard',
        currency: 'Ruble',
        iban: 'MD63 L6YC 8YH4 QVQB XHIK MTML',
      },
      company: {
        address: {
          address: '8821 West Myrtle Avenue',
          city: 'Glendale',
          coordinates: {
            lat: 33.5404296,
            lng: -112.2488391,
          },
          postalCode: '85305',
          state: 'AZ',
        },
        department: 'Services',
        name: 'Aufderhar-Cronin',
        title: 'Senior Cost Accountant',
      },
      ein: '52-5262907',
      ssn: '447-08-9217',
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.30 (KHTML, like Gecko) Ubuntu/11.04 Chromium/12.0.742.112 Chrome/12.0.742.112 Safari/534.30',
    },
    {
      id: 3,
      firstName: 'Terrill',
      lastName: 'Hills',
      maidenName: 'Hoeger',
      age: 38,
      gender: 'male',
      email: 'rshawe2@51.la',
      phone: '+63 739 292 7942',
      username: 'rshawe2',
      password: 'OWsTbMUgFc',
      birthDate: '1992-12-30',
      image: 'https://robohash.org/consequunturautconsequatur.png',
      bloodGroup: 'A−',
      height: 200,
      weight: 105.3,
      eyeColor: 'Gray',
      hair: {
        color: 'Blond',
        type: 'Very curly',
      },
      domain: 'earthlink.net',
      ip: '205.226.160.3',
      address: {
        address: '560 Penstock Drive',
        city: 'Grass Valley',
        coordinates: {
          lat: 39.213076,
          lng: -121.077583,
        },
        postalCode: '95945',
        state: 'CA',
      },
      macAddress: 'F2:88:58:64:F7:76',
      university: 'University of Cagayan Valley',
      bank: {
        cardExpire: '10/23',
        cardNumber: '3586082982526703',
        cardType: 'jcb',
        currency: 'Peso',
        iban: 'AT24 1095 9625 1434 9703',
      },
      company: {
        address: {
          address: '18 Densmore Drive',
          city: 'Essex',
          coordinates: {
            lat: 44.492953,
            lng: -73.101883,
          },
          postalCode: '05452',
          state: 'VT',
        },
        department: 'Marketing',
        name: 'Lindgren LLC',
        title: 'Mechanical Systems Engineer',
      },
      ein: '48-3951994',
      ssn: '633-89-1926',
      userAgent: 'Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:21.0.0) Gecko/20121011 Firefox/21.0.0',
    },
  ],
  total: 100,
  skip: 0,
  limit: 3,
};
