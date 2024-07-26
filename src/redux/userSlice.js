import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth } from '../../firebaseConfig'; // Firebase config dosyanızın doğru yolunu buraya ekleyin
import { db } from '../../firebaseConfig';

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;

    await AsyncStorage.setItem('userToken', token);

    return {
      token,
      user,
    };
  } catch (error) {
    console.error("Error in login", error);
    throw error;
  }
});

export const register = createAsyncThunk('user/register', async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;

    await sendEmailVerification(user);
    await AsyncStorage.setItem("userToken", token);

    // Kullanıcıyı Firestore'a kaydedin
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
    });

    return token;
  } catch (error) {
    throw error;
  }
});

export const sendData = createAsyncThunk(
  'user/sendData',
  async (_, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "Player"), {
        name: "Arda",
        surname: "Güler",
        team: "Real Madrid",
        age: 18
      });
      return docRef.id;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getData = createAsyncThunk(
  'user/getData',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Player"));
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ id: doc.id, ...doc.data() });
      });
      return allData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteData = createAsyncThunk(
  'user/deleteData',
  async (docId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "Player", docId));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateDatabase = createAsyncThunk(
  'user/updateDatabase',
  async ({ docId, data }, { rejectWithValue }) => {
    try {
      const playerData = doc(db, "Player", docId);
      await updateDoc(playerData, data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState = {
  email: null,
  password: null,
  isLoading: false,
  isAuth: false,
  token: null,
  user: null,
  error: null,
  data: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      const lowerCaseEmail = action.payload.toLowerCase();
      state.email = lowerCaseEmail;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { // pending bekleme süresi
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => { // başarılı giriş
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => { // başarısız
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = "Invalid Email or Password";
      })
      .addCase(sendData.fulfilled, (state, action) => { // başarılı veri ekleme
        // Gerekirse ek işlem yapılabilir
      })
      .addCase(getData.fulfilled, (state, action) => { // başarılı veri alma
        state.data = action.payload;
      })
      .addCase(deleteData.fulfilled, (state, action) => { // başarılı veri silme
        state.data = state.data.filter(item => item.id !== action.meta.arg);
      })
      .addCase(updateDatabase.fulfilled, (state, action) => { // başarılı veri güncelleme
        // Gerekirse ek işlem yapılabilir
      })
      .addCase(logout.fulfilled, (state) => { // başarılı çıkış
        state.email = null;
        state.password = null;
        state.isAuth = false;
        state.token = null;
        state.user = null;
        state.data = [];
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      );
  }
});

export const { setEmail, setPassword, setisLoading } = userSlice.actions;
export default userSlice.reducer;


