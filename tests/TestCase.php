<?php

namespace :namespace;

class TestCase extends Orchestra\Testbench\BrowserKit\TestCase
{
	protected function getEnvironmentSetUp($app)
	{
		putenv( 'APP_DEBUG=1' );
		$app['config']->set('database.default', 'mysql');
		$app['config']->set('database.connections.mysql', [
			'driver' => 'mysql',
			'host' => env('DB_HOST', 'localhost'),
			'database' => env('DB_DATABASE', 'laravel'),
			'username' => env('DB_USERNAME', 'root'),
			'password' => env('DB_PASSWORD', ''),
		]);
		$app['config']->set('app.key', 'SomeRandomStringWith32Characters');
	}


	protected function getPackageProviders($app)
	{
		return [':namespace\:providerServicesProvider'];
	}

}
