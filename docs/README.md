# **Documentación de la Aplicación de Galletas de la Fortuna**  

## **Descripción del Proyecto**  
Este proyecto consta de dos aplicaciones personalizadas dentro de **VTEX IO**:  

1. **App Custom - Galletas de la Fortuna:**  
   - Aplicación frontend que muestra mensajes aleatorios en la interfaz del usuario.  

2. **App Admin Custom - Gestión de Mensajes:**  
   - Aplicación administrativa que permite visualizar, agregar y eliminar mensajes de la lista de galletas de la fortuna.  

## **Buenas Prácticas Implementadas**  
- **Internacionalización:** Se utilizó `react-intl` para la traducción de mensajes en VTEX IO, aprovechando los mensajes proporcionados por la plataforma.  
  - **Idiomas disponibles:** Español, inglés y portugués.  
- **Uso del VTEX Styleguide:** La interfaz sigue las pautas de diseño de VTEX IO para mantener coherencia visual con el ecosistema nativo.  
- **Modularización:** Se estructuró el código en módulos para mejorar la organización y comprensión de los componentes.  

## **Estructura del Proyecto**  
- **App Custom:** Implementación en React que consume los mensajes almacenados en el Master Data de VTEX.  
- **App Admin Custom:** Interfaz dentro del Admin de VTEX para la gestión de mensajes.  

## **Notas Importantes**  
Actualmente, la API Key y el API Token están hardcodeados. Sin embargo, en un entorno de producción, estos valores deben manejarse a través de una aplicación server-side siguiendo las buenas prácticas recomendadas por VTEX.  
[Consulta las buenas prácticas de VTEX sobre claves de aplicación](https://help.vtex.com/en/tutorial/best-practices-application-keys--7b6nD1VMHa49aI5brlOvJm)  

![image](https://github.com/user-attachments/assets/5ed712f2-3996-4796-9fa0-e7ea26422421)  


## **Ruta para la app en admin**
![image](https://github.com/user-attachments/assets/a93c6634-5d14-4e09-9600-9352026cf4d9)

---  
### **Capturas de Pantalla**  
![image](https://github.com/user-attachments/assets/ea87b57a-8c58-4214-a7ad-71ac3778396a)  
![image](https://github.com/user-attachments/assets/e4f3d624-f389-4433-9b3a-f5513b5b9447)  
![image](https://github.com/user-attachments/assets/09c67736-5bc9-49f7-b506-f166e9028f54)  


