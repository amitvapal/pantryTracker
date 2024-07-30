import { Stack,Box, Typography } from "@mui/material";

const item = [
  'tomato',
  'potato',
  'onion',
  'garlic',
  'ginger',
  'carrot',
  'lettuce',
  'cucumber',
  'bell pepper',
  'broccoli',
  'cauliflower',
  'spinach',
  'kale'

]

export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection={'column'}
      alignItems="center"
    >
      <Box border={'1px solid #333'}>
      <Box 
      width = "800px" height = "100px" 
      bgcolor = {'#ADD8E6'} 
      display={'flex'} 
      justifyContent={'center'} 
      alightItems={'center'}
      
      >
        <Typography variant = "h1" color = {'#333'} align = "center">Pantry Items</Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {item.map((item) => (
          <Box
            key={item}
            width="100%"
            height="300px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="primary.main"
            color="white"
            borderRadius={16}
            border="1px solid white" // Add this line to set the white border
          >
            <Typography variant="h3" >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Typography>
          </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  );
}
