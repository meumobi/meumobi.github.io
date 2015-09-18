
# Check if a package is installed
To check if packagename was installed, type:
`$ dpkg -s <packagename>`

You can also use dpkg-query that has a neater output for your purpose, and accepts wild cards, too.

`$ dpkg-query -l <packagename>`
	
# Find what package owns the command

`$ dpkg -S `which <command>`