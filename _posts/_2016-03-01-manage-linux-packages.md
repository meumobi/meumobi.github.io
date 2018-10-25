# How do I get a list of installed files from a package?
Add ~i (short for ?installed) to match the installed packages whose name contains bash
Automatically installed ones will be marked with A.
aptitude search '~i bash'

To match whose description contains bash.

aptitude search '~i ~d bash'
To limit to the ones that are not installed:

aptitude search '!~i bash'

If you just want a single installed package, you can find the package name
`$ apt-cache search rabbitmq`

then use dpkg -L, List files `owned' by package(s).
```bash
$ dpkg -L librabbitmq-dev
/usr/lib/x86-64/librabbit... 
...
```

# Check version of installed package


`aptitude versions <package>`

```	
$ aptitude versions ghostscript
Package ghostscript:                        
i A 9.05~dfsg-6.3+deb7u1
````
Passing -V will show detailed information about versions, again to be safe with the simulation switch:

`aptitude -V -s install <package>`
Substituting install <package> with upgrade will show the versions from all upgradeable packages.
	
# Check available version of a package

```
$ apt-cache madison php5-imagick
php5-imagick | 3.1.0~rc1-1+b2 | http://ftp.debian.org/debian/ wheezy/main amd64 Packages
php-imagick | 3.1.0~rc1-1 | http://ftp.debian.org/debian/ wheezy/main Sources
````