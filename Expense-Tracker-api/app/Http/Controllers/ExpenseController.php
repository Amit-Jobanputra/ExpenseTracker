<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function index(){
        return Auth::user()->expenses()->latest()->get();
    }

    public function store(Request $r){
        $r->validate([
            'title'=>'required',
            'amount'=>'required|numeric',
            'date'=>'required|date',
        ]);
        $expense=Auth::user()->expenses()->create($r->all());
        return response()->json([
            'message'=>'Expense created successfully',
            'expense'=>$expense,]);
    }

    public function update(Request $r, $id){
        $expense=Auth::user()->expenses()->findOrFail($id);
        $expense->update($r->all());
        return response()->json([
            'message'=>'Expense updated successfully',
            'expense'=>$expense,
        ]);
    }
    public function destroy($id){
        $expense=Auth::user()->expenses()->findOrFail($id);
        $expense->delete();
        return response()->json([
            'message'=>'Expense deleted successfully',
        ]);
    }
}
