package com.example.calculadoradevolumengeometrico

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.ComponentActivity
import kotlin.math.pow

class SphereActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.sphere_layout)

        // Calculator
        val btnCalculateActBtn = findViewById<Button>(R.id.btnCalculateSphere)
        btnCalculateActBtn.setOnClickListener{
            val PI = Math.PI
            val textFieldRadius = findViewById<EditText>(R.id.txtHeight).text.toString()

            if(textFieldRadius.isNotEmpty()){
                val radius = textFieldRadius.toDouble()
                val volume = "%.2f".format( (4/3)*PI * radius.pow(3.0))
                val result = findViewById<TextView>(R.id.txtResult)

                result.text = "El volumen de la esfera es ${volume.toString()}"
            }
        }
    }
}
