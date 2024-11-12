import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-6 text-center">
        <pre className="font-mono text-accent whitespace-pre">
          {`
       _             _            _           
   _  /\\ \\         / /\\       _  /\\ \\         
  /\\_\\\\ \\ \\       / /  \\     /\\_\\\\ \\ \\        
 / / / \\ \\ \\     / / /\\ \\   / / / \\ \\ \\       
/ / /   \\ \\ \\   / / /\\ \\ \\ / / /   \\ \\ \\      
\\ \\ \\____\\ \\ \\ /_/ /  \\ \\ \\\\ \\ \\____\\ \\ \\     
 \\ \\________\\ \\\\ \\ \\   \\ \\ \\\\ \\________\\ \\    
  \\/________/\\ \\\\ \\ \\   \\ \\ \\/________/\\ \\   
            \\ \\ \\\\ \\ \\___\\ \\ \\         \\ \\ \\  
             \\ \\_\\\\ \\/____\\ \\ \\         \\ \\_\\ 
              \\/_/ \\_________\\/          \\/_/ 
                                              
          `}
        </pre>
        <p className="text-gray-400">
          looks like you've wandered into uncharted territory
        </p>
        <Link
          href="/"
          className="inline-block text-gray-400 hover:text-accent transition-colors"
        >
          return home
        </Link>
      </div>
    </div>
  )
}
