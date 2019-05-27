


Laravel Lumen call artisan command from route


use the Artisan Facade class wherever needed:

```
use Illuminate\Support\Facades\Artisan; 
... public function process() { 
$exitCode = Artisan::call('command', [
        '--package' => 'cartalyst/sentry' // option with value
'--update-stuff' => true // boolean option
'user' => 1 // argument
        ]);
}
```

Also, in `bootstrap/app.php`, `$app->withFacades();` must be uncommented
Source: https://stackoverflow.com/a/34584816/4982169

See also official Laravel doc: [Programmatically Executing Commands](https://laravel.com/docs/master/artisan#programmatically-executing-commands)
[How to create custom console command with artisan for laravel](https://ourcodeworld.com/articles/read/248/how-to-create-a-custom-console-command-artisan-for-laravel-5-3)
