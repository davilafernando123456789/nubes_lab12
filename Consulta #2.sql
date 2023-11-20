CREATE DATABASE semana12
USE semana12
CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  fecha_nac DATE,
  foto VARCHAR(255)
);
INSERT INTO contactos (nombre, apellidos, correo, fecha_nac, foto) VALUES
('Juan', 'Pérez', 'juan@example.com', '1990-01-01', 'foto_juan.jpg'),
('María', 'Gómez', 'maria@example.com', '1985-05-15', 'foto_maria.jpg'),
('Carlos', 'Rodríguez', 'carlos@example.com', '1992-07-20', 'foto_carlos.jpg'),
('Laura', 'Fernández', 'laura@example.com', '1988-12-10', 'foto_laura.jpg'),
('Roberto', 'Martínez', 'roberto@example.com', '1995-03-25', 'foto_roberto.jpg');
