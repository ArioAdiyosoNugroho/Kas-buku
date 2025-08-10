<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index(){
        return view('Auth.index');
    }
    public function login(Request $request){
        $log = $request->validate([
            'username'=>'required',
            'password'=>'required',
        ]);

        if(Auth::attempt($log)){
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        return redirect()->back()->withErrors([
            'username' => 'nama atau pasword yang anda masukkan salah',
        ]);
    }
    public function logout(Request $request){
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
