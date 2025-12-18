const Loader = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }

  const loader = (
    <div className="flex items-center justify-center">
      <div className={`spinner ${sizeClasses[size]}`}></div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-cream-50 bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={`spinner ${sizeClasses.large} mx-auto`}></div>
          <p className="mt-4 text-brown-900 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return loader
}

export default Loader
