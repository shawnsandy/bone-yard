<?php

namespace :namespace;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;




/**
* Class Provider
 * @package :namespace
 */
class :providerThemesProvider extends ServiceProvider
{



	/**
	* Perform post-registration booting of services.
			     *
			     * @return void
			     */
			    public function boot()
			    {





		/**
		* Package views
						         */
						        $this->loadViewsFrom(__DIR__ . '/resources/views', ':package_name');
		$this->publishes(
						            [
						                __DIR__ . '/resources/views' => resource_path('views/vendor/:package_name'),
						            ], ':package_name-views'
						        );




		/**
		* Package assets
						         */
						        $this->publishes(
						            [
						                __DIR__.'/resources/assets/js/' => public_path('assets/:package_name/js/'),
						                __DIR__.'/public/assets/' => public_path('assets/')
						            ], ':package_name-assets'
						        );
		);




		/**
		* Package resources to resources
						         */
						        $this->publishes(
						            [
						                __DIR__.'/resources/assets/' => resource_path('assets/:package_name/'),
						            ], ':package_name-resources'
						        );




		/**
		* Package config
						         */
						        $this->publishes(
						            [__DIR__ . '/config/config.php' => config_path(':package_name.php')],
						            ':package_name-config'
						        );

		$this->publishes([
								            __DIR__ . '/migrations/' => database_path('migrations')
								        ], ':package_name-migrations');


		$this->loadMigrationsFrom(__DIR__ . '/migrations');
		$this->app->bind(
				        ':provider', function () {
			return new :provider();
		}
		);

		$this->registerFactoriesPath(__DIR__.'/factories');

		$views = resources_path(
		            "views/themes/:package_name"
		        );

		$this->loadViewsFrom($views, ':package_name');



	}




	/**
	* Register factories.
		    *
		    * @param  string  $path
		    * @return void
		    */
		    protected function registerFactoriesPath($path)
		    {
		$this->app->make(Factory::class)->load($path);
	}


	public function loadProviders()
		        {

		if (!$this->app->runningInConsole()) :
						            include_once __DIR__ . '/Helpers/helper.php';
		endif;


	}




	/**
	* Register any package services.
			     *
			     * @return void
			     */
			    public function register()
			    {

		$this->mergeConfigFrom(
						            __DIR__ . '/config/config.php', ':package_name'
						        );

		$this->app->bind(
						        ':provider', function () {
			return new :provider();
		}
		);
	}




}
