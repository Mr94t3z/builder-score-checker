import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import { neynar } from 'frog/middlewares'
import { Box, Image, Heading, Text, VStack, Spacer, vars } from "../lib/ui.js";
import dotenv from 'dotenv';

// Uncomment this packages to tested on local server
// import { devtools } from 'frog/dev';
// import { serveStatic } from 'frog/serve-static';


// Load environment variables from .env file
dotenv.config();

const CAST_INTENS = 
  "https://warpcast.com/~/compose?text=&embeds[]=https://builder-score-checker.vercel.app/api/frame"


export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  ui: { vars },
  browserLocation: CAST_INTENS,
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  }),
)


// Initial frame
app.frame('/', (c) => {
  const { username } = c.var.interactor || {}
    // console.log('cast: ', c.var.cast)
    // console.log('interactor: ', c.var.interactor)
    console.log('Username ', username)
  return c.res({
    image: (
      <Box
          grow
          alignVertical="center"
          backgroundColor="black"
          padding="48"
          textAlign="center"
          height="100%"
      >
          <VStack gap="4">
              <Box flexDirection="row">
                <Image
                    height="24"
                    objectFit="cover"
                    src="/talent-protocol.png"
                  />
                <Spacer size="10" />
                <Text color="grey" decoration="underline" align="center" size="14">
                  Talent Protocol
                </Text>
              </Box>
              <Spacer size="16" />
              <Heading color="white" weight="900" align="center" size="32">
                Builder Score Checker
              </Heading>
              <Spacer size="22" />
              <Text align="center" color="grey" size="16">
                A Frame to check Builder Score built with Talent Protocol.
              </Text>
              <Spacer size="22" />
              <Box flexDirection="row" justifyContent="center">
                  <Text color="white" align="center" size="14">created by</Text>
                  <Spacer size="10" />
                  <Text color="grey" decoration="underline" align="center" size="14"> @0x94t3z</Text>
              </Box>
          </VStack>
      </Box>
    ),
    intents: [
      <Button action='/search'>Start</Button>,
      <Button.Link href='https://passport.talentprotocol.com/signin'>Register</Button.Link>,
      // <Button.AddCastAction action='/builder-score'>
      //   Install Action ↓
      // </Button.AddCastAction>,
    ]
  })
})


// app.castAction(
//   '/builder-score',
//   (c) => {
//     // Stringify the entire castId object
//     const castId = JSON.stringify(c.actionData.castId);

//     // Parse the message back to an object to extract fid
//     const parsedCastId = JSON.parse(castId);
//     const castFid = parsedCastId.fid;

//     return c.frame({ path: `/builder-score-frame/${castFid}`})
//   }, 
//   { name: "Builder Score Checker", icon: "shield-check", description: "A Builder Score Checker built with Talent Protocol."}
// )


// app.frame('/builder-score-frame/:castFid', async (c) => {
//   const { castFid } = c.req.param();

//   try {
//     // Fetch API by Talent Passport ID
//     const response = await fetch(`https://api.talentprotocol.com/api/v2/passports/${id}`);
    
//     // Check if the response is ok (status code 200-299)
//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
    
//     // Parse the JSON from the response
//     const data = await response.json();
    
//     // Log the entire data
//     // console.log('Entire Data:', data);

//     const username = data.passport.passport_profile.name;
//     const score = data.passport.score;

//     return c.res({
//       image: (
//         <Box
//             grow
//             alignVertical="center"
//             backgroundColor="black"
//             padding="48"
//             textAlign="center"
//             height="100%"
//         >
//             <VStack gap="4">
//                 <Box flexDirection="row">
//                   <Image
//                       height="24"
//                       objectFit="cover"
//                       src="/talent-protocol.png"
//                     />
//                   <Spacer size="10" />
//                   <Text color="grey" decoration="underline" align="center" size="14">
//                     Talent Protocol
//                   </Text>
//                 </Box>
//                 <Spacer size="16" />
//                 <Heading color="white" weight="900" align="center" size="32">
//                   Builder Score
//                 </Heading>
//                 <Spacer size="22" />
//                 <Text color="metalPink" align="center" size="16">Beginner</Text>
//                 <Spacer size="10" />
//                 <Box flexDirection="row" justifyContent="center">
//                     <Text color="grey" align="center" size="16">@{username} have score</Text>
//                     <Spacer size="10" />
//                     <Text color="metalPink" align="center" size="16"> {score} 🎟️</Text>
//                 </Box>
//                 <Spacer size="22" />
//                 <Box flexDirection="row" justifyContent="center">
//                     <Text color="white" align="center" size="14">created by</Text>
//                     <Spacer size="10" />
//                     <Text color="grey" decoration="underline" align="center" size="14"> @0x94t3z</Text>
//                 </Box>
//             </VStack>
//         </Box>
//       ),
//       intents: [
//         <Button.Link href='https://passport.talentprotocol.com/signin'>Register</Button.Link>,
//       ]
//     });
//   } catch (error) {
//     return c.res({
//       image: (
//         <Box
//             grow
//             alignVertical="center"
//             backgroundColor="black"
//             padding="48"
//             textAlign="center"
//             height="100%"
//         >
//             <VStack gap="4">
//                 <Box flexDirection="row">
//                   <Image
//                       height="24"
//                       objectFit="cover"
//                       src="/talent-protocol.png"
//                     />
//                   <Spacer size="10" />
//                   <Text color="grey" decoration="underline" align="center" size="14">
//                     Talent Protocol
//                   </Text>
//                 </Box>
//                 <Spacer size="16" />
//                 <Heading color="white" weight="900" align="center" size="32">
//                   ⚠️ Error ⚠️
//                 </Heading>
//                 <Spacer size="22" />
//                 <Text align="center" color="grey" size="16">
//                    Uh oh, Talent Passport ID not found!
//                 </Text>
//                 <Spacer size="22" />
//                 <Box flexDirection="row" justifyContent="center">
//                     <Text color="white" align="center" size="14">created by</Text>
//                     <Spacer size="10" />
//                     <Text color="grey" decoration="underline" align="center" size="14"> @0x94t3z</Text>
//                 </Box>
//             </VStack>
//         </Box>
//       ),
//     });
//   }
// })


app.frame('/search', async (c) => {
  // const { username } = c.var.interactor || {}
  //   console.log('cast: ', c.var.cast)
  //   console.log('interactor: ', c.var.interactor)
  //   console.log('Username ', username)

  const username = 401992;
  return c.res({
    image: (
      <Box
          grow
          alignVertical="center"
          backgroundColor="black"
          padding="48"
          textAlign="center"
          height="100%"
      >
          <VStack gap="4">
              <Box flexDirection="row">
                <Image
                    height="24"
                    objectFit="cover"
                    src="/talent-protocol.png"
                  />
                <Spacer size="10" />
                <Text color="grey" decoration="underline" align="center" size="14">
                  Talent Protocol
                </Text>
              </Box>
              <Spacer size="16" />
              <Heading color="white" weight="900" align="center" size="32">
                Builder Score Checker
              </Heading>
              <Spacer size="22" />
              <Text align="center" color="grey" size="16">
                Do you want to check your Builder Score?
              </Text>
              <Spacer size="22" />
              <Box flexDirection="row" justifyContent="center">
                  <Text color="white" align="center" size="14">created by</Text>
                  <Spacer size="10" />
                  <Text color="grey" decoration="underline" align="center" size="14"> @0x94t3z</Text>
              </Box>
              <Spacer size="32" />
          </VStack>
      </Box>
    ),
    intents: [ 
      // <TextInput placeholder="Talent Passport ID e.g 401992" />,
      <Button action={`/result/${username}`}>Yes, please!</Button>,
      <Button action='/'>Nope</Button>,
    ]
  })
})


app.frame('/result/:username', async (c) => {
  // const { inputText } = c;

  const { username } = c.req.param();

  const id = username;

  try {
    // Fetch API by Talent Passport ID
    const response = await fetch(`https://api.talentprotocol.com/api/v2/passports/${id}`);
    
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    
    // Parse the JSON from the response
    const data = await response.json();
    
    // Log the entire data
    // console.log('Entire Data:', data);

    const username = data.passport.passport_profile.name;
    const image = data.passport.passport_profile.image_url;
    const score = data.passport.score;

    return c.res({
      image: (
        <Box
            grow
            alignVertical="center"
            backgroundColor="black"
            padding="48"
            textAlign="center"
            height="100%"
        >
            <VStack gap="4">
                <Box flexDirection="row">
                  <Image
                      height="24"
                      objectFit="cover"
                      src="/talent-protocol.png"
                    />
                  <Spacer size="10" />
                  <Text color="grey" decoration="underline" align="center" size="14">
                    Talent Protocol
                  </Text>
                </Box>
                <Spacer size="22" />
                <Box flexDirection="row" alignHorizontal="center" alignVertical="center">
                <Image
                    borderRadius="38"
                    height="48"
                    width="48"
                    objectFit="cover"
                    src={image}
                  />
                <Spacer size="10" />
                <Text color="metalPink" align="center" size="12">
                  @{username}
                </Text>
                </Box>
                <Spacer size="22" />
                <Text color="grey" align="center" size="18">[ Beginner ]</Text>
                <Spacer size="10" />
                <Box flexDirection="row" justifyContent="center">
                    <Text color="metalPink" align="center" size="48">{score}</Text>
                    <Spacer size="10" />
                    <Text color="grey" align="center" size="14"> pts.</Text>
                </Box>
            </VStack>
        </Box>
      ),
      intents: [
        <Button action='/search'>Try it</Button>,
        <Button.Link href={`https://warpcast.com/~/compose?text=My%20Builder%20Score%20%F0%9F%8E%AF%0AFrame%20by%20@0x94t3z.eth&embeds[]=https://builder-score-checker.vercel.app/api/frame/result/${id}`}>Share</Button.Link>,
      ]
    });
  } catch (error) {
    return c.res({
      image: (
        <Box
            grow
            alignVertical="center"
            backgroundColor="black"
            padding="48"
            textAlign="center"
            height="100%"
        >
            <VStack gap="4">
                <Box flexDirection="row">
                  <Image
                      height="24"
                      objectFit="cover"
                      src="/talent-protocol.png"
                    />
                  <Spacer size="10" />
                  <Text color="grey" decoration="underline" align="center" size="14">
                    Talent Protocol
                  </Text>
                </Box>
                <Spacer size="16" />
                <Heading color="white" weight="900" align="center" size="32">
                  ⚠️ Failed ⚠️
                </Heading>
                <Spacer size="22" />
                <Text align="center" color="grey" size="16">
                   Uh oh, you need to sign-up first!
                </Text>
                <Spacer size="22" />
                <Box flexDirection="row" justifyContent="center">
                    <Text color="white" align="center" size="14">created by</Text>
                    <Spacer size="10" />
                    <Text color="grey" decoration="underline" align="center" size="14"> @0x94t3z</Text>
                </Box>
            </VStack>
        </Box>
      ),
      intents: [
        <Button action='/search'>Try again ⏏︎</Button>,
        <Button.Link href='https://passport.talentprotocol.com/signin'>Register</Button.Link>,
      ]
    });
  }
})


// Uncomment this line code to tested on local server
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
