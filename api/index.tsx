import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'
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
  browserLocation: CAST_INTENS
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})


// Initial frame
app.frame('/', (c) => {
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
      <Button action='/search'>Search 🕵🏽</Button>,
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
                Please insert Talent Passport ID to check the Builder Score.
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
      <TextInput placeholder="Talent Passport ID e.g 401992" />,
      <Button action='/result'>Submit ⇧</Button>,
      <Button action='/'>Cancel ⏏︎</Button>,
    ]
  })
})


app.frame('/result', async (c) => {
  const { inputText } = c;

  const id = inputText;

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
                <Spacer size="16" />
                <Heading color="white" weight="900" align="center" size="32">
                  Builder Score
                </Heading>
                <Spacer size="22" />
                <Text color="yellow" align="center" size="16">Beginner</Text>
                <Spacer size="10" />
                <Box flexDirection="row" justifyContent="center">
                    <Text color="grey" align="center" size="16">@{username} have score</Text>
                    <Spacer size="10" />
                    <Text color="yellow" align="center" size="16"> {score} 🎟️</Text>
                </Box>
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
        <Button.Link href='https://passport.talentprotocol.com/signin'>Register</Button.Link>,
        <Button action='/search'>Back ⏏︎</Button>,
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
                  ⚠️ Error ⚠️
                </Heading>
                <Spacer size="22" />
                <Text align="center" color="grey" size="16">
                   Uh oh, Talent Passport ID not found!
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
      ]
    });
  }
})


// Uncomment this line code to tested on local server
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
