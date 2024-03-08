<?php

namespace App\Http\Controllers\Api;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = User::all();

            return response()->json($user);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' =>  $e->getMessage(),
            ], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * Display the specified resource.
     */
    public function show($user)
    {
        try {
            $user = User::findOrFail($user);

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Utilisateur non trouvé'
                ], 404);
            }


            // $latestReview = $user->receiverReviews->first(); // Assuming reviews are ordered by creation date

            return response()->json([
                'status' => true,
                'data' => [
                    'user' => $user,
                    // 'latestReview' => $latestReview
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur : ' . $e->getMessage()
            ], 500);
        }
    }

    public function multi($userIds)
    {
        try {
            $userIds = array_map('intval', explode(',', $userIds));


            // Ajoutez ces lignes pour déboguer
            Log::info('IDs reçus:', $userIds);

            $users = User::whereIn('id', $userIds)->get(); // Assurez-vous que cette requête retourne des résultats

            if ($users->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Aucun utilisateur trouvé pour les IDs donnés'
                ], 404);
            }

            // $latestReviews = $users->flatMap->receiverReviews->first(); // Obtient la première revue pour chaque utilisateur

            return response()->json([
                'status' => true,
                'data' => [
                    'users' => $users,
                    // 'latestReviews' => $latestReviews,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur : ' . $e->getMessage()
            ], 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user, $id)
    {
        try {
            $validator = Validator::make($request->all(), [

                'user_role' => 'required|min:1|string',
                'user_pseudo' => 'required|min:1|string|unique:users,user_pseudo,' . $id,
                'user_email' => 'required|min:1|string|unique:users,user_email,' . $id,
                'password' => 'required|string|min:8',
                'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Ajout de règles pour l'image
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors(),
                ], 401);
            }

            $user = User::findOrFail($id);

            // Vérifiez si un nouveau fichier image est téléchargé
            if ($request->hasFile('user_image')) {
                $filenameWithExt = $request->file('user_image')->getClientOriginalName();
                $filenameWithExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $request->file('user_image')->getClientOriginalExtension();
                $filename = $filenameWithExt . '_' . time() . '.' . $extension;
                $request->file('user_image')->storeAs('public/uploads', $filename);

                // Supprimez l'ancien fichier image s'il existe
                if ($user->user_image && Storage::exists('public/uploads/' . $user->user_image)) {
                    Storage::delete('public/uploads/' . $user->image);
                }

                // // Attribuez le nom du fichier à l'utilisateur
                $user->user_image = $filename;
            }

            $user->update([

                'user_pseudo' => $request->user_pseudo,
                'user_email' => $request->user_email,
                'user_email' => $request->user_role,
                'password' => Hash::make($request->password),

            ]);

            return response()->json([
                'data' => $user,
                'status' => true,
                'message' => 'Utilisateur modifié avec succès'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur lors de la modification de l\'utilisateur : ' . $e->getMessage(),
            ], 403);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user)
    {
        try {

            $user_find = User::findOrFail($user);

            $user_find->delete();

            return response()->json([
                'status' => true,
                'message' => 'Utilisateur supprimé avec succès'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur lors de la suppression de l\'utilisateur : ' . $e->getMessage(),
            ], 403);
        }
    }
}
