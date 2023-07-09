export const postsResponseMock = {
  posts: [
    {
      id: 1,
      title: 'His mother had always taught him',
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      userId: 9,
      tags: ['history', 'american', 'crime'],
      reactions: 2,
    },
    {
      id: 2,
      title: 'He was an expert but not in a discipline',
      body: 'He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.',
      userId: 13,
      tags: ['french', 'fiction', 'english'],
      reactions: 2,
    },
    {
      id: 3,
      title: 'Dave watched as the forest burned up on the hill.',
      body: "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
      userId: 32,
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
        id: 63,
        username: 'eburras1q',
      },
    },
    {
      id: 2,
      body: 'What terrific math skills you’re showing!',
      postId: 27,
      user: {
        id: 71,
        username: 'omarsland1y',
      },
    },
    {
      id: 3,
      body: 'You are an amazing writer!',
      postId: 61,
      user: {
        id: 29,
        username: 'jissetts',
      },
    },
  ],
  total: 340,
  skip: 0,
  limit: 3,
};

export const userMock = {
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
};
