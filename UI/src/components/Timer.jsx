function CountdownTimer ({ totalSeconds }) {
  return (
    <div>
      <div>
        <h6>Countdown:</h6>
        <div className='flex gap-2 text-lg'>
          <p>{Math.floor(totalSeconds / (24 * 60 * 60))} days</p>
          <p>{Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))} hours</p>
          <p>{Math.floor((totalSeconds % (60 * 60)) / 60)} minutes</p>
          <p>{totalSeconds % 60} seconds</p>
        </div>
      </div>

    </div>
  )
}

export default CountdownTimer
