package com.example.calculadoradevolumengeometrico

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.ComponentActivity
import kotlin.math.pow

class ConeCircularActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.cone_circular_layout)

        // Calculator
        val btnCalculateActBtn = findViewById<Button>(R.id.btnCalculateCircularCone)
        btnCalculateActBtn.setOnClickListener {
            val PI = Math.PI
            val textFieldRadius = findViewById<EditText>(R.id.txtRadius).text.toString()
            val textFieldHeight = findViewById<EditText>(R.id.txtHeight).text.toString()

            if (textFieldRadius.isNotEmpty() && textFieldHeight.isNotEmpty()) {
                val radius = textFieldRadius.toDouble()
                val height = textFieldHeight.toDouble()
                val constant = (1.0/3.0)
                val volume = "%.2f".format(constant * PI * radius.pow(2.0) * height) //PI * r^2 * h
                val result = findViewById<TextView>(R.id.txtResult)

                result.text = "El volumen del cono circular es ${volume.toString()}"
            }
        }
    }
}