<?php

namespace App\Http\Controllers;

use App\Models\Keuangan;
use App\Models\Saldo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KeuanganController extends Controller
{
    public function index()
    {
        $keuangans = Keuangan::with('category', 'user')->latest()->get();
        $saldo = Saldo::first()->saldo ?? 0;
        $pemasukan = Keuangan::where('jenis', 'pemasukan')->sum('nominal');
        $pengeluaran = Keuangan::where('jenis', 'pengeluaran')->sum('nominal');

        return response()->json([
            'saldo' => $saldo,
            'total_pemasukan' => $pemasukan,
            'total_pengeluaran' => $pengeluaran,
            'data' => $keuangans
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'keterangan' => 'nullable|string',
            'tanggal' => 'required|date',
            'jenis' => 'required|in:pemasukan,pengeluaran',
            'nominal' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $data['username'] = Auth::user()->name;
        $data['user_id'] = Auth::id();

        $keuangan = Keuangan::create($data);

        // update saldo
        $saldo = Saldo::firstOrCreate(['id' => 1], ['saldo' => 0]);
        if ($keuangan->jenis === 'pemasukan') {
            $saldo->saldo += $keuangan->nominal;
        } else {
            $saldo->saldo -= $keuangan->nominal;
        }
        $saldo->save();

        return response()->json(['message' => 'Data berhasil disimpan']);
    }
}
