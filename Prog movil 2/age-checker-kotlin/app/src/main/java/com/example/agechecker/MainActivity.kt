package com.example.agechecker

import android.os.Bundle
import android.widget.EditText
import android.widget.Button
import android.widget.TextView
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_layout)

        val editTextDate = findViewById<EditText>(R.id.editTextDate)
        val btnSubmit = findViewById<Button>(R.id.btnSubmit)

        editTextDate.setOnClickListener{ showDatePickerDialog() }
        btnSubmit.setOnClickListener { onButtonClick() }
    }

    private fun showDatePickerDialog() {
        val datePicker = DatePickerFragment{ day, month, year -> onDateSelected(day, month, year)}
        datePicker.show(supportFragmentManager, "datePicker")
    }
    
    private fun onDateSelected(day:Int, month:Int, year:Int){
        val editTextDate = findViewById<EditText>(R.id.editTextDate)

        editTextDate.setText("${day}/${month}/${year}")
    }

    private fun onButtonClick(){
        val txtNombre = findViewById<EditText>(R.id.nameField).text.toString()
        val editTextDate = findViewById<EditText>(R.id.editTextDate)
        val txtResult = findViewById<TextView>(R.id.resultTxt)

        val bDayStr = editTextDate.text.toString()

        val dateFormat = SimpleDateFormat("dd/MM/yyyy")

        try{
            val bDay = dateFormat.parse(bDayStr)
            val currentDate = Date()

            val calBDay = Calendar.getInstance()
            val calCurrentDate = Calendar.getInstance()

            calBDay.time = bDay
            calCurrentDate.time = currentDate

            var age = calCurrentDate.get(Calendar.YEAR) - calBDay.get(Calendar.YEAR)


            //Verify if the user has already pass their birthday in this year
            if ( calBDay.get(Calendar.MONTH) > calCurrentDate.get(Calendar.MONTH) ||
                (calBDay.get(Calendar.MONTH) == calCurrentDate.get(Calendar.MONTH) &&
                calBDay.get(Calendar.DAY_OF_MONTH) > calCurrentDate.get(Calendar.DAY_OF_MONTH))) {

                age--
            }

            var ageResult:String = ""
            var imageResource:Int

            if(age >= 18){
                ageResult = "Es mayor de edad."
                imageResource = R.drawable.adult
            }else{
                ageResult = "Es menor de edad"
                imageResource = R.drawable.kid
            }

            txtResult.text = "La edad de ${txtNombre} es de ${age} años. ${ageResult}"


            val imageView = findViewById<ImageView>(R.id.imageView)
            imageView.setImageResource(imageResource)

        }catch(_: Exception){

        }


    }
}
