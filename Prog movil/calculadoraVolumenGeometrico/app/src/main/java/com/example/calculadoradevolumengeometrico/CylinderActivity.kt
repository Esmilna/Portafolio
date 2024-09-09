package com.example.calculadoradevolumengeometrico

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.ComponentActivity
import kotlin.math.pow

class CylinderActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.cylinder_layout)

        // Calculator
        val btnCalculateActBtn = findViewById<Button>(R.id.btnCalculateCylinder)
        btnCalculateActBtn.setOnClickListener{
            val PI = Math.PI
            val textFieldRadius = findViewById<EditText>(R.id.txtRadius).text.toString()
            val textFieldHeight = findViewById<EditText>(R.id.txtHeight).text.toString()

            if(textFieldRadius.isNotEmpty() && textFieldHeight.isNotEmpty()){
                val radius = textFieldRadius.toDouble()
                val height = textFieldHeight.toDouble()
                val volume = "%.2f".format( PI * radius.pow(2.0) * height) //PI * r^2 * h
                val result = findViewById<TextView>(R.id.txtResult)

                result.text = "El volumen del cilindro es ${volume.toString()}"
            }
        }
    }
}
