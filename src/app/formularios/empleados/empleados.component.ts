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
  mostrarFormularioModificacion: boolean = false;
  empleadoSeleccionado: any = null;
  totalAPagar: number = 0;

  ngOnInit() {

    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
      this.calcularTotalAPagar();
    }
  }

  agregarEmpleado() {

    const nuevoEmpleado = { 
      ...this.empleado, 
      pagoBase: this.calcularPagoBase(this.empleado.horasTrabajadas),
      pagoHorasExtras: this.calcularPagoHorasExtras(this.empleado.horasTrabajadas),
      totalPago: this.calcularPagoTotal(this.empleado.horasTrabajadas)
    };
    
    this.empleados.push(nuevoEmpleado);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.calcularTotalAPagar();
    this.empleado = {
      matricula: '',
      nombre: '',
      correo: '',
      edad: 0,
      horasTrabajadas: 0
    };
  }

  calcularPagoBase(horasTrabajadas: number): number {
    const salarioHora = 70;
    const horasBase = horasTrabajadas <= 40 ? horasTrabajadas : 40;
    return horasBase * salarioHora;
  }

  calcularPagoHorasExtras(horasTrabajadas: number): number {
    const salarioExtra = 140;
    const horasExtras = horasTrabajadas > 40 ? horasTrabajadas - 40 : 0;
    return horasExtras * salarioExtra;
  }

  calcularPagoTotal(horasTrabajadas: number): number {
    return this.calcularPagoBase(horasTrabajadas) + this.calcularPagoHorasExtras(horasTrabajadas);
  }

  calcularTotalAPagar() {
    this.totalAPagar = this.empleados.reduce((total, emp) => total + emp.totalPago, 0);
  }

  imprimirTabla() {
    this.tabla = true;
  }

  modificarEmpleado() {
    const matricula = prompt('Ingrese la matrícula del empleado que desea modificar:');
    const index = this.empleados.findIndex(emp => emp.matricula === matricula);

    if (index !== -1) {
      this.empleadoSeleccionado = { ...this.empleados[index] };
      this.mostrarFormularioModificacion = true;
    } else {
      alert('Matrícula no encontrada. Intente de nuevo.');
    }
  }

  actualizarEmpleado() {
    const index = this.empleados.findIndex(emp => emp.matricula === this.empleadoSeleccionado.matricula);

    if (index !== -1) {

      this.empleados[index].horasTrabajadas = this.empleadoSeleccionado.horasTrabajadas;
      this.empleados[index].pagoBase = this.calcularPagoBase(this.empleadoSeleccionado.horasTrabajadas);
      this.empleados[index].pagoHorasExtras = this.calcularPagoHorasExtras(this.empleadoSeleccionado.horasTrabajadas);
      this.empleados[index].totalPago = this.calcularPagoTotal(this.empleadoSeleccionado.horasTrabajadas);
      

      localStorage.setItem('empleados', JSON.stringify(this.empleados));


      this.calcularTotalAPagar();
      

      this.mostrarFormularioModificacion = false;
      this.empleadoSeleccionado = null;
      
      alert('Empleado actualizado correctamente.');
    }
  }

  cancelarModificacion() {
    this.mostrarFormularioModificacion = false;
    this.empleadoSeleccionado = null;
  }

  eliminarEmpleado() {
    const matricula = prompt('Ingrese la matrícula del empleado que desea eliminar:');
  
    if (matricula) {
      const empleadoExiste = this.empleados.some(emp => emp.matricula === matricula);
  
      if (empleadoExiste) {
        this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
        localStorage.setItem('empleados', JSON.stringify(this.empleados));
        this.calcularTotalAPagar();
        alert('Empleado eliminado correctamente.');
      } else {
        alert('Matrícula no encontrada. Intente de nuevo.');
      }
    } else {
      alert('Debe ingresar una matrícula.');
    }
  }

  /* calcularTotalAPagar() {
    const salarioHora = 70;
    const salarioExtra = 140;

    this.totalAPagar = this.empleados.reduce((total, emp) => {
      const horasBase = emp.horasTrabajadas <= 40 ? emp.horasTrabajadas : 40;
      const horasExtra = emp.horasTrabajadas > 40 ? emp.horasTrabajadas - 40 : 0;
      const pagoEmpleado = (horasBase * salarioHora) + (horasExtra * salarioExtra);
      return total + pagoEmpleado;
    }, 0);
  } */
}
