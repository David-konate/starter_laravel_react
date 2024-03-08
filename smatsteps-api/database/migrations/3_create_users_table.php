<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécute les migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_pseudo', 50)->unique();

            $table->string('user_email',)->unique();
            $table->boolean('is_admin')->default(false);
            $table->string('password');
            $table->string('user_image', 50)->nullable();
            $table->string('slug')->unique();

            $table->timestamp('email_verified_at')->nullable();


            $table->rememberToken();

            $table->timestamps();
        });
    }

    /**
     * Revertit les migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
