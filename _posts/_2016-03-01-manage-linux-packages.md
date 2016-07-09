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


