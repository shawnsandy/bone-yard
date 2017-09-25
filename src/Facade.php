<?php
    /**
     * Created by PhpStorm.
     * User: Shawn
     * Date: 2/22/2017
     * Time: 10:15 PM
     */

    namespace :namespace;




    use Illuminate\Support\Facades\Facade;

    class :providerFacade extends Facade
    {

        /**
         *
         */
        protected static function  getFacadeAccessor() {
            return ":provider";
        }

    }
