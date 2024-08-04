'use client'
import { useState, useEffect } from 'react'
import { Stack, Box, Typography, Modal, TextField, Button, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { firestore } from '@/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await updateDoc(docRef, {
        quantity: quantity + 1
      });
    } else {
      await setDoc(docRef, {
        quantity: 1
      });
    }
    await updateInventory();
  };

  const incrementItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await updateDoc(docRef, {
        quantity: quantity + 1
      });
      await updateInventory();
    }
  };

  const decrementItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity > 1) {
        await updateDoc(docRef, {
          quantity: quantity - 1
        });
        await updateInventory();
      }
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ backgroundColor: '#1a1a2e', color: '#e0e0e0', padding: 3 }}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>Pantry Tracker 🤤</Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "300px", marginTop: "10px", marginBottom: "20px", backgroundColor: '#2d2d44', color: '#e0e0e0', borderRadius: '5px' }}
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon style={{ color: '#e0e0e0' }} />
              </IconButton>
            ),
            style: {color: '#ffffff'}
          }}
        />
      </Box>
      <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#007bff', color: '#fff', marginBottom: '20px' }}>
        Add New Item
      </Button>
      <Box
        border="1px solid #333"
        width="400px"
        padding="10px"
        bgcolor="#2d2d44"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="10px"
        marginBottom="20px"
      >
        <Typography variant="h5" color='#e0e0e0'>Items 🍽️</Typography>
      </Box>
      <Stack width="600px" height="300px" spacing={2} overflow="auto">
        {filteredInventory.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor='#2d2d44'
            padding={2}
            sx={{ boxShadow: 2, margin: "10px 0", borderRadius: '10px' }}
          >
            <Typography variant='h6' color='#e0e0e0'
              style={{
                flexGrow: 1,
                fontSize: "20px"
              }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant='h6' color='#e0e0e0'
              style={{
                width: "50px",
                textAlign: "center",
                fontSize: "20px"
              }}
            >
              {quantity}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => incrementItem(name)}
                sx={{ fontSize: "14px", backgroundColor: '#007bff', color: '#fff' }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => decrementItem(name)}
                sx={{ fontSize: "14px", backgroundColor: '#ffc107', color: '#fff' }}
              >
                Decrease
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={async () => {
                  const docRef = doc(collection(firestore, 'inventory'), name);
                  await deleteDoc(docRef);
                  updateInventory();
                }}
                sx={{ fontSize: "14px", backgroundColor: '#dc3545', color: '#fff' }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
