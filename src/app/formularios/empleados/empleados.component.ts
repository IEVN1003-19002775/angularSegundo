import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export default class EmpleadosComponent implements OnInit{
  empleado: any = {
    matricula: '',
    nombre: '',
    correo: '',
    edad: 0,
    horasTrabajadas: 0
  };

  empleados: any[] = [];
  tabla: boolean = false;

  ngOnInit() {

    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  agregarEmpleado() {

    this.empleados.push({ ...this.empleado });
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.empleado = {
      matricula: '',
      nombre: '',
      correo: '',
      edad: 0,
      horasTrabajadas: 0
    };
  }

  calcularPago(emp: any) {
    const salarioHora = 70;
    const salarioExtra = 140;
    let horasBase = 0;
    let horasExtra = 0;

    if (emp.horasTrabajadas <= 40) {
      horasBase = emp.horasTrabajadas;
      horasExtra = 0;
    } else {
      horasBase = 40;
      horasExtra = emp.horasTrabajadas - 40;
    }

    return (horasBase * salarioHora) + (horasExtra * salarioExtra);
  }

  imprimirTabla() {
    this.tabla = true;
  }

  modificarEmpleado() {

    const matricula = prompt('Ingrese la matrícula del empleado que desea modificar:');
  

    const index = this.empleados.findIndex(emp => emp.matricula === matricula);
  
    if (index !== -1) {
      const empleadoModificado = prompt('Ingrese las nuevas horas trabajadas:');
      this.empleados[index].horasTrabajadas = +empleadoModificado!;
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
      
      alert('Horas trabajadas actualizadas correctamente.');
    } else {
      alert('Matrícula no encontrada. Intente de nuevo.');
    }
  }

  eliminarEmpleado() {
    const matricula = prompt('Ingrese la matrícula del empleado que desea eliminar:');
  
    if (matricula) {
      const empleadoExiste = this.empleados.some(emp => emp.matricula === matricula);
  
      if (empleadoExiste) {
        this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
        localStorage.setItem('empleados', JSON.stringify(this.empleados));
        alert('Empleado eliminado correctamente.');
      } else {
        alert('Matrícula no encontrada. Intente de nuevo.');
      }
    } else {
      alert('Debe ingresar una matrícula.');
    }
  }
}
