An episode guide for television shows mobile web app (powered by AngularJS & Silex)

[http://teevee.norseman.li/](http://teevee.norseman.li/)

![teevee-qr-code](https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=http://teevee.norseman.li)



# Install (DEV)
    $ git clone https://github.com/alexnormand/teevee
    $ cd teevee
    $ bower i
    $ cd api
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar install
    $ cd ..
    $ php -S localhost:3000




# Install (prod)
    $ git clone https://github.com/alexnormand/teevee
    $ cd teevee
    $ npm i && bower i
    $ cd api
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar install
    $ cd ..
    $ grunt
    $ cd build/
    $ php -S localhost:3000
