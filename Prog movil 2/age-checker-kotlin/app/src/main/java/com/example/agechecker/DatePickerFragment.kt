package com.example.agechecker

import android.app.DatePickerDialog
import android.app.Dialog
import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.fragment.app.DialogFragment
import android.widget.DatePicker
import java.util.Calendar

/**
 * A simple [Fragment] subclass.
 * Use the [DatePickerFragment] factory method to
 * create an instance of this fragment.
 */
class DatePickerFragment (val listener: (day: Int, month: Int, year: Int) -> Unit): DialogFragment(), DatePickerDialog.OnDateSetListener {
    override fun onDateSet(view: DatePicker?, year: Int, month: Int, dayOfMonth: Int) {
        listener(dayOfMonth, month, year)
    }

    override fun onCreateDialog(saveInstanceState: Bundle?) : Dialog {
        val c:Calendar = Calendar.getInstance()

        val day:Int = c.get(Calendar.DAY_OF_MONTH)f
        val month:Int = c.get(Calendar.MONTH)
        val year:Int = c.get(Calendar.YEAR)

        val picker = DatePickerDialog(activity as Context, this, year, month, day)
        return picker
    }

}