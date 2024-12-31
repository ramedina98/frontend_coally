# Frontend Taskify APP

## 📚 Índice

1. [Introducción](#introducción)
2. [Clona el repo](#clona-el-repo)
    - [Variables de entorno requeridas](#variables-de-entorno-requeridas)
3. [Funcionamiento](#funcionamiento)
4. [Patron de diseño](#patron-de-diseño)
5. [Redux](#redux)
6. [Tecnologías relevantes](#tecnologías-relevantes)
7. [Contacto](#contacto)

**Da click en el link y descubre taskify** [Taskify](https://frontendcoally-production-f03e.up.railway.app/)

**Nota:** ya existe un usuario que puede ser usado para visualizar la app.

- username: richard@
- password: Kira9697

## Introducción

Este repositorio contiene el **Frontend** de la app **Taskify**. Esta interfaz de usuario es muy intuitiva y responsiva
Taskify, la plataforma que resolvera tu día a día.

## Clona el repo

- Asegurarse de tener node y vite instalados en tu maquina.
- Crear las variables de entorno necesarias (en su archivo .env)
- git clone https://github.com/ramedina98/frontend_coally
- npm install (para instalar todos los paquetes)
- npm run dev

### Variables de entorno requeridas

```JavaScript
VITE_API_URL_AUTH=https://outstanding-spontaneity-production.up.railway.app/auth
VITE_API_URL_TASK=https://outstanding-spontaneity-production.up.railway.app/task
VITE_API_URL_USER=https://outstanding-spontaneity-production.up.railway.app/user
```

## Funcionamiento

El funcionamiento de la app esta optimizado para gestionar correctamente la cuenta de cada usuario.
Al dar click [Taskify](https://frontendcoally-production-f03e.up.railway.app/) en el link, seras dirigido a la vista principal, donde se te mostrara un breve mensaje, y en el header podras navegar al formulario para iniciar sesión o a otro en el cual podras crear una cuenta.

```JavaScript
    <Route path="/" element={<Home />}>
        <Route index element={<WelcomeView />} />
        <Route path="login"  element={<LoginForm />} />
        <Route path="register"  element={<RegisterForm />} />
        <Route path="recover-password" element={<RecoverPassForm />} />
        <Route path="reset-password" element={<ResetPassForm />} />
      </Route>
```

Al iniciar sesión con exito, seremos dirigidos hacia la ruta taskify, la cual es una ruta protegida:

```JavaScript
    <ProtectedRoute><TaskifyPage /></ProtectedRoute>
```
Dicha protección nos ayuda solo mostrar el componente si existe un token de sesión valido.
Ya dentro de la sesión poderemos tener acceso a la creación de recordatorios de tareas, editarlas, actualizar su estado (completada / incompleta) y a su eliminación.

```Javascript
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<WelcomeView />} />
        <Route path="login"  element={<LoginForm />} />
        <Route path="register"  element={<RegisterForm />} />
        <Route path="recover-password" element={<RecoverPassForm />} />
        <Route path="reset-password" element={<ResetPassForm />} />
      </Route>
      <Route path="/taskify" element={<ProtectedRoute><TaskifyPage /></ProtectedRoute>}>
        <Route index element={<Dashboar />}/>
      </Route>
    </Routes>
```
## Patron de diseño

- src
    - assets
    - components
        - atoms
        - molecules
        - organisms
        - templates
    - features
        - auth
        - tasks
        - user
    - pages
    - store
    - styles
    - utils
    - app.jsx
    - main.jsx

## Redux

La aplicación usa redux para el manejo de los contextos necesarios para su funcionamiento, esto con el objetivo de hacer mucho más sencillo y organizado esto.

**index.jsx**
```javaScript
    import { configureStore } from "@reduxjs/toolkit";
    import authReducer from '../features/auth/authSlice';
    import tasksReducer from '../features/tasks/taskSlice';
    import userReducer from '../features/user/userSlice';

    const store = configureStore({
        reducer: {
            auth: authReducer,
            tasks: tasksReducer,
            user: userReducer
        },
    });

    export default store;
```

Son 3 los contextos necesarios para el funcionamiento de la app:

1. auth: esto para el manejo correcto de la sesión.

```javaScript
    const initialState = {
        user: null,
        accessToken: localStorage.getItem("accessToken") || null,
        users: [],
        emails: [],
        isLoading: false,
        error: null,
        message: null,
    };

    const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            clearError(state) {
                state.error = null;
            },
        },
        extraReducers: (builder) => {
            builder
                // Obtener usuarios
                .addCase(getUsers.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(getUsers.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.users = action.payload.data.usernames;
                    state.emails = action.payload.data.emails;
                })
                .addCase(getUsers.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
                // Login
                .addCase(loginUser.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.message = null;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.accessToken = action.payload.accessToken;
                    state.message = action.payload.message;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
                // Logout
                .addCase(logoutUser.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.message = null;
                })
                .addCase(logoutUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.user = null;
                    state.accessToken = null;
                    state.message = action.payload;
                })
                .addCase(logoutUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
                // Registro de usuario
                .addCase(registerUser.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.message = null;
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.message = action.payload;
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
                // Recuperación de contraseña
                .addCase(recoverPassword.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.message = null;
                })
                .addCase(recoverPassword.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.message = action.payload;
                })
                .addCase(recoverPassword.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
                // Restablecimiento de la contraseña
                .addCase(resetPassword.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.message = null;
                })
                .addCase(resetPassword.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.message = action.payload;
                })
                .addCase(resetPassword.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
        },
    });

    export const { clearError } = authSlice.actions;
    export default authSlice.reducer;
```

2. user: para obtener los datos del usuario mediante el token de sesión.

```javaScript
    // Estado inicial
    const initialState = {
        info: {},
        loading: false,
        error: null,
    };


    const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            clearError(state) {
                state.error = null;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(getUserInfo.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getUserInfo.fulfilled, (state, action) => {
                    state.loading = false;
                    state.info = action.payload; // Guardar la información del usuario
                })
                .addCase(getUserInfo.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload; // Guardar el error
                });
        },
    });

    export const { clearError } = userSlice.actions;

    export default userSlice.reducer;
```

3. tasks: contexto que maneja el CRUD del funcionamiento principal de la app.

```javaScript
    // Estado inicial
    const initialState = {
        tasks: [],
        loading: false,
        error: null,
        change: 0,
    };

    const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Caso pendiente
            .addCase(createNewTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido
            .addCase(createNewTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            // Caso rechazado
            .addCase(createNewTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Caso pendiente de getTasks
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido de getTasks
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            // Caso rechazado de getTasks
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTask = action.payload;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Caso pendiente
            .addCase(updateATask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido
            .addCase(updateATask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                    state.change += 1;
                }
            })
            // Caso rechazado
            .addCase(updateATask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Caso pendiente
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                // Eliminamos la tarea del estado
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            // Caso rechazado
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        },
    });

    export const { clearError } = tasksSlice.actions;

    export default tasksSlice.reducer;
```

## Tecnologías relevantes

- TailwindCSS: Mediante el uso de sus clases pude lograr comoponentes mejor desarrollados.

- Vite: Para un desarrollo ágil y una compilación optimizada.

- React Router DOM: Para una navegación fluida entre diferentes vistas o páginas.

- Axios: Para simplificar las solicitudes a APIs, gestionando las respuestas y errores de forma eficiente.

- Redux (Toolkit): Para gestionar estados complejos de la aplicación de manera centralizada y eficiente.

## Contacto

### Ricardo Medina

- [LinkedIn](https://www.linkedin.com/in/ricardomedinamartin/)
- 📧 [Email](mailto:rmedinamartindelcampo@gmail.com)